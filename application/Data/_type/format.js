/// <amd-module name="Data/_type/format" />
/**
 * Formats library.
 * @library Data/_type/format
 * @includes Field Data/_type/format/Field
 * @includes ArrayField Data/_type/format/ArrayField
 * @includes BinaryField Data/_type/format/BinaryField
 * @includes BooleanField Data/_type/format/BooleanField
 * @includes DateField Data/_type/format/DateField
 * @includes DateTimeField Data/_type/format/DateTimeField
 * @includes DictionaryField Data/_type/format/DictionaryField
 * @includes EnumField Data/_type/format/EnumField
 * @includes fieldsFactory Data/_type/format/fieldsFactory
 * @includes FlagsField Data/_type/format/FlagsField
 * @includes HierarchyField Data/_type/format/HierarchyField
 * @includes IdentityField Data/_type/format/IdentityField
 * @includes IntegerField Data/_type/format/IntegerField
 * @includes LinkField Data/_type/format/LinkField
 * @includes MoneyField Data/_type/format/MoneyField
 * @includes ObjectField Data/_type/format/ObjectField
 * @includes RealField Data/_type/format/RealField
 * @includes RecordField Data/_type/format/RecordField
 * @includes RecordSetField Data/_type/format/RecordSetField
 * @includes RpcFileField Data/_type/format/RpcFileField
 * @includes StringField Data/_type/format/StringField
 * @includes TimeField Data/_type/format/TimeField
 * @includes TimeIntervalField Data/_type/format/TimeIntervalField
 * @includes UniversalField Data/_type/format/UniversalField
 * @includes UuidField Data/_type/format/UuidField
 * @includes UuidField Data/_type/format/UuidField
 * @includes XmlField Data/_type/format/XmlField
 * @author Мальцев А.А.
 */
define('Data/_type/format', [
    'require',
    'exports',
    'Data/_type/format/Field',
    'Data/_type/format/ArrayField',
    'Data/_type/format/BinaryField',
    'Data/_type/format/BooleanField',
    'Data/_type/format/DateField',
    'Data/_type/format/DateTimeField',
    'Data/_type/format/DictionaryField',
    'Data/_type/format/EnumField',
    'Data/_type/format/fieldsFactory',
    'Data/_type/format/FlagsField',
    'Data/_type/format/HierarchyField',
    'Data/_type/format/IdentityField',
    'Data/_type/format/IntegerField',
    'Data/_type/format/LinkField',
    'Data/_type/format/MoneyField',
    'Data/_type/format/ObjectField',
    'Data/_type/format/RealField',
    'Data/_type/format/RecordField',
    'Data/_type/format/RecordSetField',
    'Data/_type/format/RpcFileField',
    'Data/_type/format/StringField',
    'Data/_type/format/TimeField',
    'Data/_type/format/TimeIntervalField',
    'Data/_type/format/UniversalField',
    'Data/_type/format/UuidField',
    'Data/_type/format/XmlField'
], function (require, exports, Field_1, ArrayField_1, BinaryField_1, BooleanField_1, DateField_1, DateTimeField_1, DictionaryField_1, EnumField_1, fieldsFactory_1, FlagsField_1, HierarchyField_1, IdentityField_1, IntegerField_1, LinkField_1, MoneyField_1, ObjectField_1, RealField_1, RecordField_1, RecordSetField_1, RpcFileField_1, StringField_1, TimeField_1, TimeIntervalField_1, UniversalField_1, UuidField_1, XmlField_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Field = Field_1.default;
    exports.ArrayField = ArrayField_1.default;
    exports.BinaryField = BinaryField_1.default;
    exports.BooleanField = BooleanField_1.default;
    exports.DateField = DateField_1.default;
    exports.DateTimeField = DateTimeField_1.default;
    exports.DictionaryField = DictionaryField_1.default;
    exports.EnumField = EnumField_1.default;
    exports.fieldsFactory = fieldsFactory_1.default;
    exports.FlagsField = FlagsField_1.default;
    exports.HierarchyField = HierarchyField_1.default;
    exports.IdentityField = IdentityField_1.default;
    exports.IntegerField = IntegerField_1.default;
    exports.LinkField = LinkField_1.default;
    exports.MoneyField = MoneyField_1.default;
    exports.ObjectField = ObjectField_1.default;
    exports.RealField = RealField_1.default;
    exports.RecordField = RecordField_1.default;
    exports.RecordSetField = RecordSetField_1.default;
    exports.RpcFileField = RpcFileField_1.default;
    exports.StringField = StringField_1.default;
    exports.TimeField = TimeField_1.default;
    exports.TimeIntervalField = TimeIntervalField_1.default;
    exports.UniversalField = UniversalField_1.default;
    exports.UuidField = UuidField_1.default;
    exports.XmlField = XmlField_1.default;
});