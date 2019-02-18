// React depends on "requestAnimationFrame", which does not exist in the Node environment.
// This polyfill meets the requirements of React.
// NOTE: Must be imported BEFORE enzyme to avoid warnings about React depending on requestAnimationFrame.
import "raf/polyfill";

import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

// Enzyme must be configured with the correct React adapter before we can use it.
Enzyme.configure({ adapter: new Adapter() });
