import core=require("./core")
import RC=require("types-ui")
import SourceCode=RC.controls.SourceCode;

var example:core.LoadedExample;
var content: SourceCode=new SourceCode("Value", "json", JSON.stringify({}, null, 2));

var source= RC.view("Source",e=>{
    e.innerHTML = "";
    if (example) {
        var folder = new RC.controls.HorizontalTabFolder();
        folder.add(new SourceCode("RAML", "yaml", example.raml));
        folder.add(new SourceCode("JSON", "json", example.exampleCode()));
        folder.add(new SourceCode("JavaScript", "javascript", example.javascript()));
        folder.add(new SourceCode("Rendering options", "json", JSON.stringify(example.renderingOptions, null, 2)));
        folder.add(content);
        folder.render(e);
    }
})
var details = RC.view("Example", e=>{
    e.innerHTML = "";
    if (example) {
        var bnd = example.createBinding();
        bnd.addListener(e=>content.setContent(JSON.stringify(bnd.get(), null, 2)));
        RC.render(e,bnd,example.renderingOptions);
    }
})

var list = RC.simpleListView("List of Demos", core.examples,"https://maxcdn.icons8.com/Color/PNG/24/Travel/mess_tin-24.png","name");
list.addSelectionConsumer((i: core.IExample) =>{
        if (i) {
            core.loadExample(i,(x)=>{
                example=x;
                source.refresh();
                details.refresh();
            })
        }
    }
)
var demoPerspective = {
    views: [
        {view: details, ref: "*", ratio: 100, relation: RC.Relation.LEFT},
        {view: list, ref: "Example", ratio: 15, relation: RC.Relation.LEFT},
        {view: source, ref: "Example", ratio: 40, relation: RC.Relation.BOTTOM},
    ]
}
var app = RC.application("app","Types UI (examples)", demoPerspective, demoPerspective);