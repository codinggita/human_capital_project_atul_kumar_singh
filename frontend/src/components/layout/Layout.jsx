import Sidebar from './Sidebar';
import Topbar from './Topbar';
export default function Layout({children}) { return <div className="layout-container"><Sidebar/><div className="main-content"><Topbar/><main className="content-area">{children}</main></div></div>; }