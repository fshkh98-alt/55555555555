import { ResourcePage } from "../resource-page";
import { EducationManager } from "../../../components/resource-manager";
export const dynamic="force-dynamic";
export default function Page(){return <ResourcePage resource="education" active="Education">{items:any[]=><EducationManager items={items}/>}</ResourcePage>}
