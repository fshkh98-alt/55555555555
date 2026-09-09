import { ResourcePage } from "../resource-page";
import { PostsManager } from "../../../components/resource-manager";
export const dynamic="force-dynamic";
export default function Page(){return <ResourcePage resource="post" active="Blog">{items:any[]=><PostsManager items={items}/>}</ResourcePage>}
