import tui=require("types-ui/dist/forms");
import ramlLoader=require("raml2type-bindings");
import controls=require("types-ui/dist/controls");
import display=require("types-ui/dist/uifactory");
import wb=require("types-ui/dist/workbench");
import {SourceCode, VerticalFlex} from "types-ui/dist/controls";
class DemoView extends wb.TreeView {}
var dv = new DemoView("List of Demos", "Demo")

const renderingOptions={};
class Details extends wb.ViewPart {

    input: any

    elementId:string

    context:any

    innerRender(c: HTMLElement) {
        c.innerHTML = "";
        if (this.input) {
            var edit=null;

            var toRender=null;
            var tp=this.input;
            var op={};
            var isOp=false;
            Object.keys(tp).forEach(x => {
                tui.tps.service.register(<tui.tps.Type>tp[x]);//
                toRender = this.input[x];
            });
            if (this.elementId){
                if (this.input[this.elementId]){
                    toRender=this.input[this.elementId];
                }
                tp=this.input.types;

            }


                var bnd = tui.tps.binding(tui.tps.service.newInstance(toRender), toRender);
                if (this.context){
                    Object.keys(this.context).forEach(x=>{
                        bnd.addVar(x,this.context[x]);
                    })
                }
                bnd.addListener({
                    valueChanged(){
                        source.content._content = JSON.stringify(bnd.get(), null, 2)
                        source.content.refresh();
                    }
                })
                var control = display.service.createControl(bnd, renderingOptions);
                control.render(c);


        }
    }

    constructor(t:string,i:string){
        super(t,i);
    }

    setInput(i: any) {
        this.input = i
        this.refresh();
    }
}
function beatify(id:string){
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
class SourceType extends wb.ViewPart {

    input: any

    content:SourceCode;

    innerRender(c: HTMLElement) {

        c.innerHTML = "";
        if (this.input) {
            var tp=this.input;
            var op={};
            var isOp=false;
            var id=this.input.id;
            if (!id) {
                Object.keys(this.input.jsonTypeObj).forEach(x => {
                    id = x;
                });
            }
            id=beatify(id);
            var res = new controls.HorizontalTabFolder("div");
            var sc = new controls.SourceCode();
            sc.setTitle("RAML")
            sc.setLanguage("yaml")
            sc.setContent(this.input.editType);
            res.add(sc);
            var sc = new controls.SourceCode();
            sc.setTitle("JSON")
            sc.setLanguage("json")
            sc.setContent(this.input.jsonType);
            res.add(sc);
            var sc = new controls.SourceCode();
            sc.setTitle("JavaScript")
            sc.setLanguage("javascript")
            sc.setContent("RC.render(document.getElementById('demo'),"+id+","+JSON.stringify(this.input.context)+","+JSON.stringify(this.input.renderingOptions)+")");
            res.add(sc);
            var sc = new controls.SourceCode();
            sc.setTitle("Rendering options")
            sc.setContent(JSON.stringify(this.input.renderingOptions, null, 2));
            res.add(sc);
            var vs=new VerticalFlex();
            var sc = new controls.SourceCode();
            vs.setTitle("Value")
            sc.setContent(JSON.stringify({}, null, 2));
            vs.add(sc)
            res.add(vs);
            this.content=sc;            
            res.render(c);
        }
        else {
        }
    }
    setInput(i: any) {
        if (i) {
            ramlLoader.parseToJSON(window.location.protocol+"//"+window.location.host + i.file, (f) => {
                var rr=f.types;

                this.input ={
                    editType:f.ramlSource,
                    jsonTypeObj:rr,
                    jsonType:JSON.stringify(rr,null,2),
                    renderingOptions:{},
                    context:i.context? i.context:{},
                    id:i.id
                }
                this.refresh();
                details.elementId=i.id;
                details.context=i.context;
                details.setInput(f.types);

            })

        }
    }
}
var examples=[
    {
        name: "Simplest Possible Case",
        file: "examples/example0.raml"
    },
    {
        name: "Form with dependent fields",
        file: "examples/example1.raml"
    },
    {
        name: "Enum descriptions",
        file: "examples/example2.raml"
    },
    {
        name: "Compute Function",
        file: "examples/example21.raml"
    },
    {
        name: "Type ahead",
        file: "examples/example3.raml"
    },
    {
        name: "Calculated enum",
        file: "examples/example4.raml"
    },
    {
        name: "Map",
        file: "examples/example5.raml"
    },
    {
        name: "Union type",
        file: "examples/example6.raml"
    },
    {
        name: "Array types",
        file: "examples/example70.raml"
    },
    {
        name: "Map types",
        file: "examples/example7.raml"
    },
    {
        name: "Github Search",
        file: "examples/github0.raml",
        id:"_search_issues_get"
    },
    {
        name: "Github Issues CRUD",
        file: "examples/github1.raml",
        id:"_repos__owner___repo__issues_get",//
        context:{
            owner:"petrochenko-pavel-a",
            repo:"testRepo"
        }
    },
    {
        name: "Github My Repos",
        file: "examples/github2.raml",
        id:"_user_orgs_get",//
        context:{
            owner:"petrochenko-pavel-a",
        }
    },
    {
        name: "Github My Repos(with lib)",
        file: "examples/github20.raml",
        id:"_user_orgs_get",//
        context:{
            owner:"petrochenko-pavel-a",
        }
    },
    {
        name: "Github Filters",
        file: "examples/github200.raml",
        id:"_repos__owner___repo__issues_get",//
        context:{
            owner:"raml-org",
            repo:"raml-js-parser-2"
        }
    },
    {
        name: "Stack Exchange",
        file: "examples/stackExchange.raml",
        id:"_questions_get",//
        context:{
            filter:"withbody", //
            site:"stackoverflow", //repo:"stackoverflow"
        }
    },
    {
        name: "Stack Exchange 2",
        file: "examples/stackExchange0.raml",
        id:"_questions_get",//
        context:{
            filter:"withbody", //
            site:"stackoverflow", //repo:"stackoverflow"
        }
    },
    {
        name: "Stack Exchange 3",
        file: "examples/stackExchange1.raml",
        id:"_questions_get",//
        context:{
            filter:"withbody", //
            site:"stackoverflow", //repo:"stackoverflow"
        }
    },
    {
        name: "Space launches",
        file: "examples/launchLibrary.raml",
        id:"_launch_get",//
        context:{
            mode:"verbose", //repo:"stackoverflow"
        }
    },
    {
        name: "Space launches 2",
        file: "examples/launchLibrary0.raml",
        id:"_launch_get",//
        context:{
            mode:"verbose", //repo:"stackoverflow"
        }
    },
    {
        name: "Glot Snippets",
        file: "examples/snippetsApi.raml",
        id:"_snippets_get",////

    },
];
dv.setInput(examples)
dv.setLabelProvider({

    label(a: any){
        return `<img src="https://maxcdn.icons8.com/Color/PNG/24/Travel/mess_tin-24.png"></img>`+a.name;
    }
})
var details = new Details("Example", "Example")
var source = new SourceType("Source", "Source")
dv.addSelectionConsumer(source)
var demoPerspective = {
    title: "Demo",

    actions: [],

    views: [
        {view: details, ref: "*", ratio: 100, relation: wb.Relation.LEFT},
        {view: dv, ref: "Example", ratio: 15, relation: wb.Relation.LEFT},
        {view: source, ref: "Example", ratio: 40, relation: wb.Relation.BOTTOM},
    ]
}
wb.defaultNavBar.brandRight = "";
var app = new wb.Application("Types UI Demo 2", demoPerspective, "app", demoPerspective);