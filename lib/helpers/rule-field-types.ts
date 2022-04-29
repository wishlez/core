import {Option} from '../../types/input';
import {AnyObject} from '../../types/object';
import {RuleFieldTypes} from '../../types/rule-field-types';

const fieldTypeLabels: AnyObject<RuleFieldTypes, string> = {
    amount: 'Amount',
    date: 'Date',
    description: 'Description',
    fromAccount: 'From Account',
    tags: 'Tags',
    toAccount: 'To Account'
};

export const getFieldTypeDescription = (fieldType: RuleFieldTypes) => fieldTypeLabels[fieldType];

export const useFieldTypeOptions = (): Option[] => {
    return Object.entries(fieldTypeLabels).map(([value, label]) => ({
        label,
        value
    })) || [];
};
