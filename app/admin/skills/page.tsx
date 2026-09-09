import { ResourcePage } from "../resource-page";
import { SkillsManager } from "../../../components/resource-manager";
export const dynamic="force-dynamic";
export default function Page(){return <ResourcePage resource="skill" active="Skills">{(items:any[])=><SkillsManager items={items}/>}</ResourcePage>}
