import { sequelize } from './utils/db.js';
import './models/user.model.js';
import './models/master.model.js';
import './models/customer.model.js';
import './models/admin.model.js';
import './models/treatmentType.model.js';
import './models/treatment.model.js';
import './models/record.model.js';

await sequelize.sync({ force: true });
