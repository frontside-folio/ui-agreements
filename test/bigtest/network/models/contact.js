import { Model, belongsTo } from '@bigtest/mirage';

export default Model.extend({
  agreement: belongsTo()
});
