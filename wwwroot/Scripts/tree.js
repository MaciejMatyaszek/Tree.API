
function usuwanie(obj) {

    for (var i = 0; i < obj.length; i++) {
        if (obj[i].children) {
         
            usuwanie(obj[i].children);
        }
        var Id = obj[i].id;

        $.ajax({
            type: 'DELETE',
            url: 'https://localhost:44366/value/' + Id,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',

        });
    }
}








function usuwanieFirst(table, id) {


    for (var i = 0; i < table.length; i++) {

        if (table[i].id == id) {
          
            if (table[i].children != null) {
                usuwanie(table[i].children);
            }


        }
    }
    
}



function usuwanieLast(id) {

    $.ajax({
        type: 'DELETE',
        url: 'https://localhost:44366/value/' + id,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {


        },


    });
}












function combobox() {

    $.ajax({
        type: 'GET',
        url: 'https://localhost:44366/value/allElemennts',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {

            $('#ParentId').empty();

            var s = document.getElementById("ParentId");
       
            for (var i = 0; i < data.length; i++) {
          
                $('<option />', { value: data[i].id, text: data[i].name }).appendTo(s);
            }

        }
    });
}






function rozwin() {
    var toggler = document.getElementsByClassName("caret");
    var i;

    for (i = 0; i < toggler.length; i++) {

        toggler[i].parentElement.querySelector(".nested").classList.toggle("active");
        toggler[i].classList.toggle("caret-down");

    }

    var s = $("#rozwin").text();
    if (s == 'Rozwin') {
        $("#rozwin").text("Zwin");
    }
    else {
        $("#rozwin").text("Rozwin");
    }

}



function time() {
    $(document).ready(function () {
        $("i").click(function (e) {

            var check = event.target.id + "a";
            var setid = $("#" + check).val();
        
            var temp = setid + "da";
            var temp2 = setid + "sa";
            var temp3 = setid + "ha";
           

            var Id = setid;
            if (temp == check) {


                if (confirm("Are you sure?")) {


                    $.ajax({
                        type: 'GET',
                        url: 'https://localhost:44366/value/full',
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {
                            

                            usuwanieFirst(data, Id);

                        
                            usuwanieLast(Id);


                            $("#tree").empty();


                            setTimeout(() => renderTree(), 400);
                            generate();

                        }
                    });


                  


                }
            }
            else if (temp2 == check) {
                $.ajax({
                    type: 'GET',
                    url: 'https://localhost:44366/value/' + Id,
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                       

                        $("#Name").val(data.name);
                        $("#ParentId").val(data.parentId);
                        $("#Id").val(data.id);

                    }
                });



            }
            else if(temp3 == check) {
                var idsort = event.target.id + "a";
                var valsortid = $("#" + idsort).val();
                
                 $("#tree").empty();

                setTimeout(() => renderTreeSortBranch(valsortid), 400);
                generate();
                    
            }

        });
    });
}










setTimeout(() => time(), 1000);

function getElemById(i) {

    $.ajax({
        type: 'GET',
        url: 'https://localhost:44366/value/full',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            $("#Name").val(data.name);

            $("#ParentId").val(data.parentId);
            $("#Id").val(data.id);
           

        }
    });
}




function add() {
    id = $("#id").val();
    name = $("#Name").val();
    parentId = $("#ParentId").val();
    

    if (name != "") {



        var data = {
            "Id": id,
            "Name": name,
            "ParentId": parentId
        };



        $.ajax({
            type: 'POST',
            url: 'https://localhost:44366/value/',
            dataType: 'json',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                $("#tree").empty();
                renderTree();
                generate();

            }
        });
        $("#error").empty();

    }
    else {
        $("#error").empty().append("Wpisz nazwe ");
    }
}



function getElemById(Id) {



    $.ajax({
        type: 'GET',
        url: 'https://localhost:44366/value/' + Id,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            $("#Name").val(data.name);

            $("#ParentId").val(data.parentId);
            $("#Id").val(data.id);
        }
    });
}


function change() {
    id = $("#Id").val();
    name = $("#Name").val();
    parentId = $("#ParentId").val();
    if (name != "") {



        var data = {
            "Id": id,
            "Name": name,
            "ParentId": parentId
        };



        $.ajax({
            type: 'PUT',
            url: 'https://localhost:44366/value/',
            dataType: 'json',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                $("#tree").empty();
                alert("Sukces");
                renderTree();
                generate();


                $("#Id").val(0);
                $("#Name").val("");
                $("#ParentId").val(1);
            }
        });
        $("#error").empty();
    }
    else {
        $("#error").empty().append("Wpisz nazwe");
    }


}



function to_uld(temp) {


    
    for (var i = 0, n = temp.length; i < n; i++) {
        var child = temp[i];
        var test = document.getElementById(child.id + "s");

        if (test == null) {


            document.getElementById(child.id).innerHTML += "   <i id=" + child.id + "s class=\"fas fa-tools\"><input id=" + child.id + "sa type=\"hidden\" value=" + child.id + "></i>";
            document.getElementById(child.id).innerHTML += "   <i  id=" + child.id + "d class=\"fa fa-trash\" aria-hidden=\"true\"><input id=" + child.id + "da type=\"hidden\" value=" + child.id + "></i></i>";

        }
        else {
            document.getElementById(child.id + "s").innerHTML += "  <i id=" + child.id + "s  class=\"fas fa-tools\"><input id=" + child.id + "sa type=\"hidden\" value=" + child.id + "></i>";
            document.getElementById(child.id + "s").innerHTML += "  <i  id=" + child.id + "d class=\"fa fa-trash\" aria-hidden=\"true\"><input id=" + child.id + "da type=\"hidden\" value=" + child.id + "></i></i>";
            document.getElementById(child.id + "s").innerHTML += "  <i  id=" + child.id + "h class=\"fa fa-filter\" aria-hidden=\"true\"><input id=" + child.id + "ha type=\"hidden\" value=" + child.id + "></i></i>";
        }

        if (child.children) {
            to_uld(child.children);
        }


    }


}


function dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    }
}



function to_ul(temp, obj) {

    var ul = document.createElement("ul");
    if (obj.name != "root") {
        ul.className = "nested";
    }
    if (obj.name == 'root') {
        ul.id = "myUL";
        var liroot = document.createElement("li");
        var uln = document.createElement("ul");
        var spanroot = document.createElement("span")
        spanroot.id="root";
        var sg = document.createTextNode("Tree");
        spanroot.className = "caret";

        spanroot.appendChild(sg);
        uln.className = "nested";
        ul.appendChild(liroot);
        liroot.appendChild(spanroot);
        liroot.appendChild(uln);


        

    }

    for (var i = 0, n = temp.length; i < n; i++) {
        var child = temp[i];
        var li = document.createElement("li");
        var button = document.createElement("a");
        var button2 = document.createElement("a");
        var spanek = document.createElement("span");
        spanek.className = "caret";

        li.id = child.id;
        spanek.id = child.id + "s";
        button.id = child.id + "a";
        button2.id = child.id + "t";

        var y = document.createTextNode("<i class=\"fas fa-plus-circle\"></i>");
        button2.href = "www.google.pl"
        button.href = "https://localhost:44366/value/test";
        button.appendChild(y);
        var text = document.createTextNode(child.name);


        if (child.children) {
            spanek.appendChild(text);
            li.appendChild(spanek);
            li.appendChild(to_ul(child.children, child.name));
        }
        else {
            li.appendChild(text);

        }
        if (obj.name == 'root') {

            uln.appendChild(li);
        }
        else {
            ul.appendChild(li);
            var at = child.id + "a";
        }
    }

    return ul;
}
function to_ulSort(temp, obj) {

    var ul = document.createElement("ul");
    if (obj.name != "root") {
        ul.className = "nested";
    }
    if (obj.name == 'root') {
        ul.id = "myUL";
        var liroot = document.createElement("li");
        var uln = document.createElement("ul");
        var spanroot = document.createElement("span")
        spanroot.id = "root";
        var sg = document.createTextNode("Tree");
        spanroot.className = "caret";

        spanroot.appendChild(sg);
        uln.className = "nested";
        ul.appendChild(liroot);
        liroot.appendChild(spanroot);
        liroot.appendChild(uln);




    }
    if (temp != null) {
       
        temp.sort(dynamicSort("name"));
       
    }

    for (var i = 0, n = temp.length; i < n; i++) {
        var child = temp[i];
        var li = document.createElement("li");
        var button = document.createElement("a");
        var button2 = document.createElement("a");
        var spanek = document.createElement("span");
        spanek.className = "caret";

        li.id = child.id;
        spanek.id = child.id + "s";
        button.id = child.id + "a";
        button2.id = child.id + "t";

        var y = document.createTextNode("<i class=\"fas fa-plus-circle\"></i>");
        button2.href = "www.google.pl"
        button.href = "https://localhost:44366/value/test";
        button.appendChild(y);
        var text = document.createTextNode(child.name);


        if (child.children) {
            spanek.appendChild(text);
            li.appendChild(spanek);
            li.appendChild(to_ulSort(child.children, child.name));
        }
        else {
            li.appendChild(text);

        }
        if (obj.name == 'root') {

            uln.appendChild(li);
        }
        else {
            ul.appendChild(li);
            var at = child.id + "a";
        }
    }

    return ul;
}

async function renderTree() {
    var treeEl = document.getElementById("tree");
    const api_url = 'https://localhost:44366/value/all';

    const response = await fetch(api_url);
    const data = await response.json();



    var treeObj = data;

    if (treeObj.children != null) {


        treeEl.appendChild(to_ul(treeObj.children, treeObj));
        to_uld(treeObj.children);
    }
}

async function renderTreeSort() {
    var treeEl = document.getElementById("tree");
    const api_url = 'https://localhost:44366/value/all';

    const response = await fetch(api_url);
    const data = await response.json();



    var treeObj = data;


    treeEl.appendChild(to_ulSort(treeObj.children, treeObj));
    to_uld(treeObj.children);
}

async function renderTreeSortBranch(id) {
    var treeEl = document.getElementById("tree");
    const api_url = 'https://localhost:44366/value/all';

    const response = await fetch(api_url);
    const data = await response.json();



    var treeObj = data;


    treeEl.appendChild(to_ulSortBranch(treeObj.children, treeObj, id));
    to_uld(treeObj.children);
}

function to_ulSortBranch(temp, obj, id) {

    var ul = document.createElement("ul");
    if (obj.name != "root") {
        ul.className = "nested";
    }
    if (obj.name == 'root') {
        ul.id = "myUL";
        var liroot = document.createElement("li");
        var uln = document.createElement("ul");
        var spanroot = document.createElement("span")
        
        spanroot.id = "root";
        var sg = document.createTextNode("Tree");
        spanroot.className = "caret";

        spanroot.appendChild(sg);
        uln.className = "nested";
        ul.appendChild(liroot);
        liroot.appendChild(spanroot);
        liroot.appendChild(uln);

    }
    if (id == 1) {
        temp.sort(dynamicSort("name"));
        id = id - 1;

    }
   


    

    for (var i = 0, n = temp.length; i < n; i++) {
        var child = temp[i];
        var li = document.createElement("li");
        var button = document.createElement("a");
        var button2 = document.createElement("a");
        var spanek = document.createElement("span");
        spanek.className = "caret";

        li.id = child.id;
        spanek.id = child.id + "s";
        button.id = child.id + "a";
        button2.id = child.id + "t";

        var y = document.createTextNode("<i class=\"fas fa-plus-circle\"></i>");
        button2.href = "www.google.pl"
        button.href = "https://localhost:44366/value/test";
        button.appendChild(y);
        var text = document.createTextNode(child.name);
 
        if (child.id == id) {
            child.children.sort(dynamicSort("name"));
        }

        if (child.children) {
           
            spanek.appendChild(text);
            li.appendChild(spanek);

          

                li.appendChild(to_ulSortBranch(child.children, child.name, id));
            
            
        }
        else {
            li.appendChild(text);

        }
        if (obj.name == 'root') {

            uln.appendChild(li);
        }
        else {
            ul.appendChild(li);
            var at = child.id + "a";
        }
    }

    return ul;
}


async function testowa() {
    var toggler = document.getElementsByClassName("caret");
    var i;


    for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function () {
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
        });
    }




}




document.addEventListener("DOMContentLoaded", function (event) {

    var toggler = document.getElementsByClassName("caret");

    

});






renderTree();
setTimeout(() => AddIconToRoot(), 1002);
setTimeout(() => testowa(), 1002);
setTimeout(() => time(), 800);
setTimeout(() => combobox(), 1000);
setTimeout(() => rozwin(), 1001);


function generate(){
    setTimeout(() => AddIconToRoot(), 1002);
    setTimeout(() => testowa(), 1002);
    setTimeout(() => time(), 800);
    setTimeout(() => combobox(), 1000);
    setTimeout(() => rozwin(), 1001);
}

function AddIconToRoot() {
   
    $("#root").append('<i id=\"1r\" class=\"fas fa-sort-alpha-down\" aria-hidden=\"true\"><input id=\"1ra\" type=\"hidden\" value=\"1\"></i></i>');
    $("#root").append('<i id=\"1g\" class=\"fas fa-filter\" aria-hidden=\"true\"><input id=\"1ga\" type=\"hidden\" value=\"1\"></i></i>');

    $(document).ready(function () {
        $("#1r").click(function (e) {

            $("#tree").empty();
            renderTreeSort();
            setTimeout(() => AddIconToRoot(), 1002);
            generate();


        });

    });

    $(document).ready(function () {
        $("#1g").click(function (e) {

            $("#tree").empty();
            renderTreeSortBranch(1);
            generate();


        });

    });




}