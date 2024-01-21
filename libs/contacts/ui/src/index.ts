import { withRouter } from './utils';
import { ContactDashboard } from './contacts/contact-dashboard';

export default withRouter(ContactDashboard); // for lazy loading in routing

export * from './contacts';
export * from './utils';
