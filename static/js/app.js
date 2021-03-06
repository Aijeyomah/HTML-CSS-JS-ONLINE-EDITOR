window.onload = function () {
    let htmlEditor = ace.edit("html");
    htmlEditor.session.setMode("ace/mode/html")
    htmlEditor.setTheme("ace/theme/nord_dark")
    htmlEditor.setValue(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

</body>
</html>`); 
    htmlEditor.session.setUseWrapMode(true)
    htmlEditor.setShowPrintMargin(false);
    htmlEditor.session.on('change', function(delta) {
        update()
        
    });



    let cssEditor = ace.edit("css");
    cssEditor.session.setMode("ace/mode/css");
    cssEditor.setTheme("ace/theme/nord_dark");
    cssEditor.setValue(`body {

    }`); 
    cssEditor.session.setUseWrapMode(true)
    cssEditor.setShowPrintMargin(false);
    cssEditor.session.on('change', function(delta) {
        update()
    });



    let jsEditor = ace.edit("javascript");
    jsEditor.session.setMode("ace/mode/javascript")
    jsEditor.setTheme("ace/theme/nord_dark");
    jsEditor.setValue("// JavaScript goes here");
    jsEditor.session.setUseWrapMode(true)
    jsEditor.setShowPrintMargin(false);
    jsEditor.session.on('change', function(delta) {
        console.log(jsEditor.getValue());
        update()
    });

    function update(){
        let output =  document.querySelector(".output .virtual-iframe").contentWindow.document;
        output.open()
        output.write("<style>"+cssEditor.getValue()+"</style>" +htmlEditor.getValue()+ "<script>" + jsEditor.getValue() + "</script> ")
        output.close()

    }

}

window.addEventListener("resize", e=>{
    for(let i = 0;  i<document.getElementsByClassName('code'); i++){
        document.getElementsByClassName("code")[i].style.height = document.querySelector(".code-editor").clientHeight - 40 + "px";
    } 
}); 

let layout = 1;

document.querySelector('.change-layout').addEventListener("click", ()=>{
    layout++;
    if(layout > 1) layout = 0;
    changeLayout()
});

function changeLayout() {
    switch (layout) {
        case 0:
            document.querySelector(".coder").classList.add("view1")
            document.querySelector(".coder").classList.remove("view2")
            document.querySelector(".container").classList.add("view1")
            document.querySelector(".container").classList.remove("view2")

            for (var i = 0; i < document.getElementsByClassName("code").length; i++) {
                document.getElementsByClassName("code")[i].style.maxHeight = "unset";
                document.getElementsByClassName("code")[i].style.height = document.querySelector(".code-editor").clientHeight - 40 + "px";
            }
            htmlEditor.resize();
            cssEditor.resize();
            jsEditor.resize();
            break;
        case 1:
            document.querySelector(".coder").classList.add("view2")
            document.querySelector(".coder").classList.remove("view1")
            document.querySelector(".container").classList.add("view2")
            document.querySelector(".container").classList.remove("view1")

            for (var i = 0; i < document.getElementsByClassName("code").length; i++) {
                document.getElementsByClassName("code")[i].style.height = document.querySelector(".code-editor").clientHeight - 40 + "px";
                document.getElementsByClassName("code")[i].style.maxHeight = "194px";
            }
            htmlEditor.resize();
            cssEditor.resize();
            jsEditor.resize();
            break;
    }
}