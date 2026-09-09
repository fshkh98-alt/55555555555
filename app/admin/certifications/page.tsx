import { ResourcePage } from "../resource-page";
import { CertificationsManager } from "../../../components/resource-manager";
export const dynamic="force-dynamic";
export default function Page(){return <ResourcePage resource="certification" active="Certifications">{items:any[]=><CertificationsManager items={items}/>}</ResourcePage>}
