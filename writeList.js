/** this file gets called when modifyList.html gets loaded, and it draws the table, populating it with all of the grocery list items and their amounts **/

//TODO fix this later
import list from "./list.json";

for (let item in list) {
    document.getElementById("list_table_body").innerHTML +=
        "<tr><td>" + item + "</td><td>" + list[item] + "</td></tr>";
}
