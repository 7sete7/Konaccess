import pick from "lodash/pick";
import { FieldAccess, MetaAccess } from "node_modules/@konecty/sdk/dist/sdk/types/access";
import { KonCondition } from "node_modules/@konecty/sdk/dist/sdk/types/filter";

export type AccessFieldOptions = (typeof Access.fieldOptions)[number];

export default class Access {
  _id: string;
  label: string;
  raw: Pick<MetaAccess, "fields" | "readFilter" | "updateFilter"> = {};

  static fieldOptions = ["any", "only-_user", "_user-and-group", "_user-and-allgroups", "none"] as const;

  fields: Record<string, AccessFieldOptions> = {};
  readFilter?: AccessFieldOptions;
  updateFilter?: AccessFieldOptions;

  constructor(metaAccess: MetaAccess) {
    this._id = metaAccess._id;
    this.label = metaAccess.name;
    this.raw = pick(metaAccess, ["fields", "readFilter", "updateFilter"]);

    this.parseRawFields();
  }

  private parseRawFields() {
    const conditionMap: Record<string, AccessFieldOptions> = {
      "_user._id | equals | $user": "only-_user",
      "_user.group._id | equals | $group": "_user-and-group",
      "_user.group._id | in | $allgroups": "_user-and-allgroups",
    };

    const parseCondition = (condition: KonCondition) => {
      const { term, operator, value } = condition;
      const conditionStr = `${term} | ${operator} | ${value}`;
      return conditionMap[conditionStr];
    };

    this.fields = Object.entries(this.raw.fields ?? {}).reduce<typeof this.fields>((acc, [fieldName, fieldOperations]) => {
      for (const operation in fieldOperations) {
        const fieldValue = fieldOperations[operation as keyof FieldAccess];

        if (fieldValue.condition) {
          const accessOpt = parseCondition(fieldValue.condition);

          if (accessOpt) {
            acc[fieldName] = Object.assign(acc[fieldName] ?? {}, { [operation]: accessOpt });
          } else {
            console.warn(`Unknown condition: ${fieldValue.condition}`);
          }

          continue;
        }

        acc[fieldName] = Object.assign(acc[fieldName] ?? {}, { [operation]: fieldValue.allow ? "any" : "none" });
      }
      return acc;
    }, {});

    for (const [operation, filter] of [
      ["readFilter", this.raw.readFilter],
      ["updateFilter", this.raw.updateFilter],
    ] as const) {
      this[operation] = filter && filter.conditions?.[0] ? parseCondition(filter.conditions[0]) : "any";
    }
  }
}