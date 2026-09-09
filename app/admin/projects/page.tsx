import { ResourcePage } from "../resource-page";
import { ProjectsManager } from "../../../components/resource-manager";
export const dynamic="force-dynamic";
export default function Page(){return <ResourcePage resource="project" active="Projects">{(items:any[])=><ProjectsManager items={items}/>}</ResourcePage>}
