import pick from "lodash/pick";
import { FieldAccess, MetaAccess } from "node_modules/@konecty/sdk/dist/sdk/types/access";
import { KonCondition } from "node_modules/@konecty/sdk/dist/sdk/types/filter";

export type AccessFieldOptions = (typeof Access.fieldOptions)[number];
export type AccessOperations = keyof FieldAccess;

const conditionMap: Record<string, AccessFieldOptions> = {
  "_user._id | equals | $user": "only-_user",
  "_user.group._id | equals | $group": "_user-and-group",
  "_user.group._id | in | $allgroups": "_user-and-allgroups",
};

export default class Access {
  _id: string;
  label: string;
  raw: Pick<MetaAccess, "fields" | "readFilter" | "updateFilter"> = {};

  static fieldOptions = ["any", "only-_user", "_user-and-group", "_user-and-allgroups", "none"] as const;

  fields: Record<string, Partial<Record<AccessOperations, AccessFieldOptions>>> = {};
  readFilter?: AccessFieldOptions;
  updateFilter?: AccessFieldOptions;

  constructor(metaAccess: MetaAccess) {
    this._id = metaAccess._id;
    this.label = metaAccess.name;
    this.raw = pick(metaAccess, ["fields", "readFilter", "updateFilter"]);
  }

  private parseCondition(condition: KonCondition) {
    const { term, operator, value } = condition;
    const conditionStr = `${term} | ${operator} | ${value}`;
    return conditionMap[conditionStr];
  }

  public parseRawFields() {
    const fields = Object.entries(this.raw.fields ?? {}).reduce<typeof this.fields>((acc, [fieldName, fieldOperations]) => {
      for (const operation in fieldOperations) {
        const fieldValue = fieldOperations[operation as AccessOperations];

        if (fieldValue.condition) {
          const accessOpt = this.parseCondition(fieldValue.condition);

          if (accessOpt) {
            acc[fieldName] = { ...acc[fieldName], [operation]: accessOpt };
          } else {
            console.warn(`Unknown condition: ${fieldValue.condition}`);
          }

          continue;
        }

        acc[fieldName] = { ...acc[fieldName], [operation]: fieldValue.allow === false ? "none" : "any" };
      }
      return acc;
    }, {});

    return fields;
  }

  public parseModuleFilters() {
    //TODO multiple conditions, currently using only the first one
    return {
      readFilter: this.raw.readFilter?.conditions?.[0] ? this.parseCondition(this.raw.readFilter.conditions[0]) : "any",
      updateFilter: this.raw.updateFilter?.conditions?.[0] ? this.parseCondition(this.raw.updateFilter.conditions[0]) : "any",
    };
  }
}
