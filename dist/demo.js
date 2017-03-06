"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tui = require("types-ui/dist/forms");
var ramlLoader = require("raml2type-bindings");
var controls = require("types-ui/dist/controls");
var display = require("types-ui/dist/uifactory");
var wb = require("types-ui/dist/workbench");
var controls_1 = require("types-ui/dist/controls");
var DemoView = (function (_super) {
    __extends(DemoView, _super);
    function DemoView() {
        return _super.apply(this, arguments) || this;
    }
    return DemoView;
}(wb.TreeView));
var dv = new DemoView("List of Demos", "Demo");
var renderingOptions = {};
var Details = (function (_super) {
    __extends(Details, _super);
    function Details(t, i) {
        return _super.call(this, t, i) || this;
    }
    Details.prototype.innerRender = function (c) {
        var _this = this;
        c.innerHTML = "";
        if (this.input) {
            var edit = null;
            var toRender = null;
            var tp = this.input;
            var op = {};
            var isOp = false;
            Object.keys(tp).forEach(function (x) {
                tui.tps.service.register(tp[x]);
                toRender = _this.input[x];
            });
            if (this.elementId) {
                if (this.input[this.elementId]) {
                    toRender = this.input[this.elementId];
                }
                tp = this.input.types;
            }
            var bnd = tui.tps.binding(tui.tps.service.newInstance(toRender), toRender);
            if (this.context) {
                Object.keys(this.context).forEach(function (x) {
                    bnd.addVar(x, _this.context[x]);
                });
            }
            bnd.addListener({
                valueChanged: function () {
                    source.content._content = JSON.stringify(bnd.get(), null, 2);
                    source.content.refresh();
                }
            });
            var control = display.service.createControl(bnd, renderingOptions);
            control.render(c);
        }
    };
    Details.prototype.setInput = function (i) {
        this.input = i;
        this.refresh();
    };
    return Details;
}(wb.ViewPart));
function beatify(id) {
    var r = "";
    var lastC = false;
    for (var i = 0; i < id.length; i++) {
        var c = id.charAt(i);
        if (c == '_') {
            if (lastC) {
                continue;
            }
            else {
                r = r + ".";
                lastC = true;
                continue;
            }
        }
        else {
            lastC = false;
        }
        r = r + c;
    }
    return r;
}
var SourceType = (function (_super) {
    __extends(SourceType, _super);
    function SourceType() {
        return _super.apply(this, arguments) || this;
    }
    SourceType.prototype.innerRender = function (c) {
        c.innerHTML = "";
        if (this.input) {
            var tp = this.input;
            var op = {};
            var isOp = false;
            var id = this.input.id;
            if (!id) {
                Object.keys(this.input.jsonTypeObj).forEach(function (x) {
                    id = x;
                });
            }
            id = beatify(id);
            var res = new controls.HorizontalTabFolder("div");
            var sc = new controls.SourceCode();
            sc.setTitle("RAML");
            sc.setLanguage("yaml");
            sc.setContent(this.input.editType);
            res.add(sc);
            var sc = new controls.SourceCode();
            sc.setTitle("JSON");
            sc.setLanguage("json");
            sc.setContent(this.input.jsonType);
            res.add(sc);
            var sc = new controls.SourceCode();
            sc.setTitle("JavaScript");
            sc.setLanguage("javascript");
            sc.setContent("RC.render(document.getElementById('demo')," + id + "," + JSON.stringify(this.input.context) + "," + JSON.stringify(this.input.renderingOptions) + ")");
            res.add(sc);
            var sc = new controls.SourceCode();
            sc.setTitle("Rendering options");
            sc.setContent(JSON.stringify(this.input.renderingOptions, null, 2));
            res.add(sc);
            var vs = new controls_1.VerticalFlex();
            var sc = new controls.SourceCode();
            vs.setTitle("Value");
            sc.setContent(JSON.stringify({}, null, 2));
            vs.add(sc);
            res.add(vs);
            this.content = sc;
            res.render(c);
        }
        else {
        }
    };
    SourceType.prototype.setInput = function (i) {
        var _this = this;
        if (i) {
            ramlLoader.parseToJSON(window.location.protocol + "//" + window.location.host + window.location.pathname + i.file, function (f) {
                var rr = f.types;
                _this.input = {
                    editType: f.ramlSource,
                    jsonTypeObj: rr,
                    jsonType: JSON.stringify(rr, null, 2),
                    renderingOptions: {},
                    context: i.context ? i.context : {},
                    id: i.id
                };
                _this.refresh();
                details.elementId = i.id;
                details.context = i.context;
                details.setInput(f.types);
            });
        }
    };
    return SourceType;
}(wb.ViewPart));
var examples = [
    {
        name: "Simplest Possible Case",
        file: "examples/example0.raml"
    },
    {
        name: "Form with dependent fields",
        file: "examples/example1.raml"
    },
    {
        name: "Layout 0 ",
        file: "examples/layout0.raml"
    },
    {
        name: "Layout ",
        file: "examples/actions.raml"
    },
    {
        name: "Another Layout ",
        file: "examples/card.raml"
    },
    {
        name: "Accordition ",
        file: "examples/acc.raml"
    },
    {
        name: "Star System Editor",
        file: "examples/planets.raml"
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
        id: "_search_issues_get"
    },
    {
        name: "Github Issues CRUD",
        file: "examples/github1.raml",
        id: "_repos__owner___repo__issues_get",
        context: {
            owner: "petrochenko-pavel-a",
            repo: "testRepo"
        }
    },
    {
        name: "Github My Repos",
        file: "examples/github2.raml",
        id: "_user_orgs_get",
        context: {
            owner: "petrochenko-pavel-a",
        }
    },
    {
        name: "Github My Repos(with lib)",
        file: "examples/github20.raml",
        id: "_user_orgs_get",
        context: {
            owner: "petrochenko-pavel-a",
        }
    },
    {
        name: "Github Filters",
        file: "examples/github200.raml",
        id: "_repos__owner___repo__issues_get",
        context: {
            owner: "raml-org",
            repo: "raml-js-parser-2"
        }
    },
    {
        name: "Stack Exchange",
        file: "examples/stackExchange.raml",
        id: "_questions_get",
        context: {
            filter: "withbody",
            site: "stackoverflow",
        }
    },
    {
        name: "Stack Exchange 2",
        file: "examples/stackExchange0.raml",
        id: "_questions_get",
        context: {
            filter: "withbody",
            site: "stackoverflow",
        }
    },
    {
        name: "Stack Exchange 3",
        file: "examples/stackExchange1.raml",
        id: "_questions_get",
        context: {
            filter: "withbody",
            site: "stackoverflow",
        }
    },
    {
        name: "Space launches",
        file: "examples/launchLibrary.raml",
        id: "_launch_get",
        context: {
            mode: "verbose",
        }
    },
    {
        name: "Space launches 2",
        file: "examples/launchLibrary0.raml",
        id: "_launch_get",
        context: {
            mode: "verbose",
        }
    },
    {
        name: "Glot Snippets",
        file: "examples/snippetsApi.raml",
        id: "_snippets_get",
    },
];
dv.setInput(examples);
dv.setLabelProvider({
    label: function (a) {
        return "<img src=\"https://maxcdn.icons8.com/Color/PNG/24/Travel/mess_tin-24.png\"></img>" + a.name;
    }
});
var details = new Details("Example", "Example");
var source = new SourceType("Source", "Source");
dv.addSelectionConsumer(source);
var demoPerspective = {
    title: "Demo",
    actions: [],
    views: [
        { view: details, ref: "*", ratio: 100, relation: wb.Relation.LEFT },
        { view: dv, ref: "Example", ratio: 15, relation: wb.Relation.LEFT },
        { view: source, ref: "Example", ratio: 40, relation: wb.Relation.BOTTOM },
    ]
};
wb.defaultNavBar.brandRight = "";
var app = new wb.Application("Types UI Demo 2", demoPerspective, "app", demoPerspective);
//# sourceMappingURL=demo.js.map