import ramlLoader=require("raml2type-bindings");
import tui=require("types-ui/dist/forms");
export import examples=require("./examples")

export interface IExample{
    name: string,
    file: string,
    id?: string,
    category?: string
    context?: any
}

export class LoadedExample{

    raml: string
    jsonObj: any
    renderingOptions: any={};
    example:IExample

    renderedItem():string{
        var id = this.example.id;
        if (!id) {
            Object.keys(this.jsonObj).forEach(x => {
                id = x;
            });
        }
        return id;
    }
    createBinding():tui.tps.Binding{
        tui.tps.reinit(this.jsonObj)
        var toRender =this.getType();
        var bnd = tui.tps.binding(tui.tps.service.newInstance(toRender), toRender);
        if (this.example.context) {
            Object.keys(this.example.context).forEach(x => {
                bnd.addVar(x, this.example.context[x]);
            })
        }
        return bnd;
    }

    exampleCode(){
        return JSON.stringify(this.jsonObj,null,2)
    }
    getType  ():tui.tps.Type {
        return this.jsonObj[this.renderedItem()];
    }

    javascript(){
        return "RC.render(document.getElementById('demo')," + toDotNotation(this.renderedItem()) + "," + JSON.stringify(this.example.context?this.example.context:{}) + "," + JSON.stringify(this.renderingOptions) + ")"
    }
}
export function toDotNotation(id:string): string{
    var r=""
    var lastC=false;
    for (var i=0;i<id.length;i++){
        var c=id.charAt(i);
        if (c=='_'){
            if (lastC){
                continue;
            }
            else{
                r=r+".";
                lastC=true;
                continue;
            }
        }
        else{
            lastC=false
        }
        r=r+c;

    }
    return r;
}


export function loadExample(ex:IExample,cb:(LoadedExample)=>void){
    ramlLoader.parseToJSON(window.location.protocol + "//" + window.location.host + window.location.pathname + ex.file, (f) => {
        let res=new LoadedExample();
        res.raml=f.ramlSource;
        res.jsonObj=f.types;
        res.example=ex;
        cb(res);
    })
}