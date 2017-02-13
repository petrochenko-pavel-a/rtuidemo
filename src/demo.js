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
        _super.apply(this, arguments);
    }
    return DemoView;
}(wb.TreeView));
var dv = new DemoView("List of Demos", "Demo");
var renderingOptions = {};
var Details = (function (_super) {
    __extends(Details, _super);
    function Details(t, i) {
        _super.call(this, t, i);
    }
    Details.prototype.innerRender = function (c) {
        var _this = this;
        c.innerHTML = "";
        if (this.input) {
            var edit = null;
            Object.keys(this.input).forEach(function (x) {
                tui.tps.service.register(_this.input[x]); //
                edit = _this.input[x];
            });
            var tp = edit;
            var bnd = tui.tps.binding(tui.tps.service.newInstance(tp), tp);
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
var SourceType = (function (_super) {
    __extends(SourceType, _super);
    function SourceType() {
        _super.apply(this, arguments);
    }
    SourceType.prototype.innerRender = function (c) {
        c.innerHTML = "";
        if (this.input) {
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
            ramlLoader.parseToJSON(window.location.protocol + "//" + window.location.host + i.file, function (f) {
                _this.input = {
                    editType: f.ramlSource,
                    jsonType: JSON.stringify(f.types, null, 2),
                    renderingOptions: ""
                };
                _this.refresh();
                details.setInput(f.types);
            });
        }
    };
    return SourceType;
}(wb.ViewPart));
var examples = [
    {
        name: "Form with dependent fields",
        file: "/examples/example1.raml"
    },
    {
        name: "Enum descriptions",
        file: "/examples/example2.raml"
    },
    {
        name: "Type ahead",
        file: "/examples/example3.raml"
    },
    {
        name: "Calculated enum",
        file: "/examples/example4.raml"
    },
    {
        name: "Map",
        file: "/examples/example5.raml"
    },
    {
        name: "Union type",
        file: "/examples/example6.raml"
    },
    {
        name: "Array types",
        file: "/examples/example70.raml"
    },
    {
        name: "Map types",
        file: "/examples/example7.raml"
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
