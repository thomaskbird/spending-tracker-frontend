// React depends on "requestAnimationFrame", which does not exist in the Node environment.
// This polyfill meets the requirements of React.
// NOTE: Must be imported BEFORE enzyme to avoid warnings about React depending on requestAnimationFrame.
import "raf/polyfill";

import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { LicenseManager as AgGridLicenseManager } from "ag-grid-enterprise";

// Enzyme must be configured with the correct React adapter before we can use it.
Enzyme.configure({ adapter: new Adapter() });

AgGridLicenseManager.setLicenseKey(
    "Control-Tec_PDS_Web_App_4Devs9_March_2019__" +
        "MTU1MjA4OTYwMDAwMA==137d993909f4bf81fd198c6c37ee3d03"
);
