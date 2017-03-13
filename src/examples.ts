import core=require("./core")
var examples:core.IExample[]=[
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
export = examples