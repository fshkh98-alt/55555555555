import { ResourcePage } from "../resource-page";
import { ExperienceManager } from "../../../components/resource-manager";
export const dynamic="force-dynamic";
export default function Page(){return <ResourcePage resource="experience" active="Experience">{items:any[]=><ExperienceManager items={items}/>}</ResourcePage>}
