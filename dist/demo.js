"use strict";
var core = require("./core");
var RC = require("types-ui");
var SourceCode = RC.controls.SourceCode;
var example;
var content = new SourceCode("Value", "json", JSON.stringify({}, null, 2));
var source = RC.view("Source", function (e) {
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
});
var details = RC.view("Example", function (e) {
    e.innerHTML = "";
    if (example) {
        var bnd = example.createBinding();
        bnd.addListener(function (e) { return content.setContent(JSON.stringify(bnd.get(), null, 2)); });
        RC.render(e, bnd, {}, example.renderingOptions);
    }
});
var list = RC.simpleListView("List of Demos", core.examples, "https://maxcdn.icons8.com/Color/PNG/24/Travel/mess_tin-24.png", "name");
list.addSelectionConsumer(function (i) {
    if (i) {
        core.loadExample(i, function (x) {
            example = x;
            source.refresh();
            details.refresh();
        });
    }
});
var demoPerspective = {
    views: [
        { view: details, ref: "*", ratio: 100, relation: RC.Relation.LEFT },
        { view: list, ref: "Example", ratio: 15, relation: RC.Relation.LEFT },
        { view: source, ref: "Example", ratio: 40, relation: RC.Relation.BOTTOM },
    ]
};
var app = RC.application("app", "Types UI (examples)", demoPerspective, demoPerspective);
//# sourceMappingURL=demo.js.map