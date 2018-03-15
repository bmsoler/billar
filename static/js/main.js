var ZoomChartsLicense = "ZCP-w4sm9lg0n: Production licence for *.zoomcharts.com";
var ZoomChartsLicenseKey = "577dc0aa9e80ab25c83df560952407bfb23369d8c5566347c7"+
"b54a64a4fbc45ccf4a1e7dbaf0827249c6676c19c918ed548f67ae225e813c5f57dfdc0709137"+
"7b72c6c3883f1ae343abf24153ef77d3470ee58a8d62781eac016e311d12122256184e9b3efed"+
"8b7e38d326e1fc10efc599576f803e7a173d128115eb57dabc5f4bf7ae520a50c6963e2ab8c56"+
"2fa24fa46d246e57afb5bb129fb4507e738251b644f0bd9235665138f043cbce5acfa8197f934"+
"c58e805963693344ff5240ad98d5aba8ed583f5990cd79e109ab23daaf8cba9ac5c3fee0471b2"+
"f8f5abff432bff536d8980d582411724f60e01244c8ae94e3e31a4afe4e3322dc9aa5567eabc9";

var ZoomChartsLicense = "ZCF-1: Internal license for use only by SIA Data Visualization Software Lab developers";
var ZoomChartsLicenseKey = "806e1e733880cbaf9624abca1d3080d2af0fe82ffc93b2889f11438fdcd99fee52ab160d6efa5b543fc561d50598bdb2e5486e8b59f0cdb7ffaa59cb3c97aaf72838ac446af4fdf7071dc5abf56fc441a00df3adb061aa0afb05eff90d52ea727e904ecfa835631d64d72e8109f2f5b77d3d3261d25a943d31ab692b7ab4418e7067150076152f6946954b3b76ab083f97c8c0e3168531c78835748b384336d0cb3a0e284ec33c67d3789ae06e2cb7c554ac5f62cd29d24b90c07c6c93d59dd678bcac5b4d8cbb45ba4d15359a1c72b36cb60d541c8787c5cbc566daeccca137439dabcd2208c5f0baa83c504658d43ddc69f6276eaf645d7c99101c46ae9bd9";

window.onload = function() {
    function _(output) {
        console.log(output);
    }
    
    $("#search").on("click", function() {
        search();
    });
    $("#clear").on("click", function() {
        $("#q").val("");
        netChart.updateSettings({navigation: {initialNodes: []}});
        hidePieChart();
        $("#q").focus();
    });
    $("#q").on("click", function(ev) {
        $(this).select();
    });
    $("#q").on("keydown", function(ev) {
        var k = ev.keyCode || ev.which;
        if (k == 13) {
            search();
            ev.preventDefault();
        }
    });
    function search() {
        hidePieChart();
        $("#q").attr("disabled", true);
        searchText = $("#q").val().toLowerCase();
        if (netChart) {
            var searchOk = function(data) {
                if (data.error) {
                    alert(data.error);
                } else if (data.nodes.length == 0) {
                    alert("Nothing found");
                } else {

                    console.log('Datos SEARCH:', data);

                    var ids = [];
                    for (var i in data.nodes) {
                        ids.push(data.nodes[i].id);
                    }
                    searchIds = ids;
                    netChart.updateSettings({navigation: {initialNodes: ids}});
                }
                $("#q").attr("disabled", false);
            };

            //Blas

            //console.log(searchText);

            jQuery.ajax({
                type: "GET",
                url: "https://cpapi.zoomcharts.com/moviedb/api",
                data: {method: "search", query: searchText},
                success: searchOk,
                error: null
            });

            

        }
    }
    
    function nodeTopicValue(node){
        var val = 0;
        if (activeSlice) {
            topic = activeSlice.id;
            if (node.data.categories){
                if (node.data.categories.hasOwnProperty(topic)){
                    val =  node.data.categories[topic];
                }
            } else if (node.data.genre){
                if (node.data.genre.indexOf(topic) >= 0){
                    val = 5;
                }
            }
        }else {
            return 1;
        }
        return val;
    }

    function nodeRadius(node) {
        node.relevance = 1;
        node.isHidden = false;
        var isRelevant = false;
        var topImdb = 0;

        if (node == activeNode) {
            node.radius = 50;
            isRelevant = true;
        } else if (activeNode && node != activeNode) {
            //compute node radius based on selected topic
            var hasLink = false;
            //relevance of links to this node
            for (var linkInd in node.links) {
                var link = node.links[linkInd];
                hasLink |= (link.from == activeNode || link.to == activeNode);
            }
            if (hasLink) {
                var topicValue = nodeTopicValue(node);
                isRelevant = true;
                node.radius = 20 + topicValue * 8;
            } else {
                // no links to active node
                node.radius = 15;
            }
        } else { //default size
            node.radius = 40;
            if (sortMode == "imdb" && node.data.imdb_rating) {
                var filterLimit = filters.imdb;
                var coef = 1 + (parseFloat(node.data.imdb_rating) - filterLimit) / (10 - filterLimit + 0.1);
                node.radius = Math.max(20, node.radius * coef);
            }
        }
        // compute actor max IMDB and if is next to last node
        if (node == lastNode) {
            isRelevant = true;
        }
        for (var linkInd in node.links) {
            var neighbor = node.links[linkInd].otherEnd(node);
            var imdbR = neighbor.data.imdb_rating;
            if (imdbR > topImdb) {
                topImdb = imdbR;
            }
            if (neighbor == lastNode) {
                isRelevant = true;
            }
        }

        node.isBadImdb = ((node.data.type == "movie" && parseFloat(node.data.imdb_rating) < filters.imdb) || (node.data.type == "actor" && topImdb < filters.imdb));

        invalidYear = false;
        if (node.data.type == "movie") {
            var year = parseInt(node.data.released);
            if (year < filters.yearFrom || year > filters.yearTo) {
                invalidYear = true;
            }
        }
        if ((!isRelevant && node.isBadImdb) || invalidYear) {
            node.isHidden = true;
            node.radius = 20;
            node.relevance = 0.7;
        }
        return node;
    }
    
    
    function nodeStyle(node) {
        var label;
        var highlighted = searchText && (searchIds.indexOf(node.data.id) != -1);
        node.items = [];

        if (node.data.type == "actor") {
            node.display = "image";
            node.image = "./img/male.png";
            node.imageCropping = "crop";
            node.radius *= 0.6;
            label = node.data.name;
            if (node.data.image) {
                node.fillColor = "rgba(0,0,0,0.2)";
            } else if (node.data.gender == "female") {
                node.fillColor = "pink";
            } else if (node.data.gender == "male") {
                node.fillColor = "skyblue";
            } else {
                node.fillColor = "gray";
            }

            if (!node.isHidden || node.hovered) {
                node.opacity = 1;
            } else {
                node.fillColor = "black";
                node.opacity = 0.1;
                label = "";
            }
        } else { // movie
            node.aura = node.data.genre;
            node.display = "image";
            node.lineWidth = 1;
            node.lineColor = "#eee";
            label = node.data.name;
            year = parseInt(node.data.released);
            if (year) {
                label += " (" + year + ")";
            }
            node.labelStyle.textStyle.font = Math.min(9, 4 + node.radius / 4) + "px Arial";
            node.labelStyle.textStyle.fillColor = "white";
            node.labelStyle.backgroundStyle.fillColor = "#09c";
            node.labelStyle.backgroundStyle.lineWidth = 4;
            node.labelStyle.backgroundStyle.lineColor = "#09c";
            
//            node.labelStyle = {
//                textStyle: {font: Math.min(9, 4 + node.radius / 4) + "px Arial", fillColor: "white"},
//                backgroundStyle: {fillColor: "#09c", lineColor: "#09c", lineWidth: 4}
//            };
            node.image = "./img/movie-case-no-poster.png";
            node.imageCropping = "fit";
            if (!node.isHidden || node.hovered) {
                node.fillColor = null;
                node.opacity = 1;
                if (!node.isBadImdb) {
                    node.items.push({
                        text: starString + " " + node.data.imdb_rating,
                        px: -.45, py: 0.65, x: 0, y: 0,
                        textStyle: {fillColor: "black"}, backgroundStyle: {fillColor: "#f5de50"}
                    });
                } else {
                    node.items.push({
                        text: starString + " " + node.data.imdb_rating,
                        px: -.45, py: 0.65, x: 0, y: 0,
                        textStyle: {fillColor: "white"}, backgroundStyle: {fillColor: "#c00"}
                    });
                }
                if (node.data.awards.match(/won/i)) {
                    node.items.push({
                        image: "./img/award.png",
                        px: -0.56, py: -0.72, x: 0, y: 0,
                        backgroundStyle: {fillColor: null}
                    });
                }
            } else {
                node.fillColor = "black";
                node.opacity = 0.1;
                label = "";
                node.items.push({
                    text: starString + " " + node.data.imdb_rating,
                    px: -.45, py: 0.65, x: 0, y: 0,
                    textStyle: {fillColor: "#ecc"}, backgroundStyle: {fillColor: "#800"}
                });
            }

        }

        if (node.data.image) {            
            node.data.image = (node.data.image).replace('actors-circle/','');
            node.data.image = (node.data.image).replace('images-circle/','');
            node.data.image = (node.data.image).replace('movie-posters-circle/','');
            if ( (node.data.image).indexOf('.') === -1 ) node.data.image = node.data.image + '.jpeg';
            if (node.data.type == "actor") {
                node.image = "./img/" + node.data.image;
                //console.log(node.image);
            } else {
                node.image = "./img/" + node.data.image;
            }
        }
        
        if (node == activeNode) { //move label up to not intersect with pie chart
            node.label = "";
            node.items.push({
                text: label,
                px: 0, py: 1, x: 0, y: -20,
                textStyle: {fillColor: "black"}, backgroundStyle: {fillColor: "rgba(255,255,255,0.7)"}
            });
        } else {
            node.label = label;
        }
        if (highlighted) {
            node.labelStyle.textStyle.fillColor = "black";
            node.labelStyle.backgroundStyle.fillColor = "yellow";
            node.labelStyle.backgroundStyle.lineWidth = 6;
            node.labelStyle.backgroundStyle.lineColor = "yellow";
//            node.labelStyle = {
//                textStyle: {fillColor: "black"},
//                backgroundStyle: {fillColor: "yellow", lineWidth: 6, lineColor: "yellow"}
//            };
        }
        if (node.focused && node.selected) {
            node.label = "";
        }
        return node;
    }

    function nodeMenu(data, node) {
        if (data.type == "actor") {
            if (data.imdb_id) {
                var link = "http://www.imdb.com/name/" + data.imdb_id;
                return "<a target='_blank' href='" + link + "'> <img src='" + node.image + "' />" +
                        "<p>" + data.name + (data.birthday ? ("<small>(" + data.birthday + ")</small>") : "") + "</p></a>" +
                        (data.biography ? ("<div class='plot'><strong>Biography:</strong> " + data.biography + "</div>") : "<p>Biography not available</p>");
            } else {
                return "<a> <img src='" + node.image + "' />" +
                        "<p>" + data.name + "</p></a>" +
                        "<p>No data on this person</p>";
            }
        } else { //movie
            var link = "http://www.imdb.com/title/" + data.imdb_id;
            return "<a target='_blank' href='" + link + "'> <img src='" + node.image + "' />" +
                    "<p>" + data.name + "<small>(" + data.released + ")</small></p></a>" +
                    "<small> Runtime: " + data.runtime + " min</small>" +
                    "<div class='imdb-data'>IMDB rating: " + data.imdb_rating + " (" + data.imdb_votes + " votes)</div>" +
                    ((data.plot.length < 4) ? "" : "<div class='plot'><strong>Plot:</strong> " + data.plot + "</div>") +
                    ((data.awards.length < 4) ? "" : "<div class='awards'><p>Awards:" + data.awards + "</p></div>") +
                    "<div class='cast'><p>Director:" + data.director + "</p><p>Writer:" + data.writer + "</p></div>" +
                    "<div class='country'><p>Country:" + data.country + "</p></div>" +
                    "<div class='language'><p>Language:" + data.language + "</p></div>" +
                    "<div class='buttons'><a href='#' class='trailer'>Watch trailer</a><a class='buy' href='#'>Buy Movie</a></div>";
        }
    }

    
    
    function hideOverlay() {
        $("#overlay").fadeOut(1400);
    }
    $("#imdb-rating a").on("click", function() {
        filters.imdb = parseInt($(this).attr("title"));
        $("#imdb-rating a").each(function() {
            if (parseInt($(this).attr("title")) <= filters.imdb) {
                $(this).addClass("on");
                $(this).removeClass("off");
            } else {
                $(this).addClass("off");
                $(this).removeClass("on");
            }
            $("#imdb-rating small strong").html(filters.imdb);
        });
        hidePieChart();
        lastNode = null;
        netChart.updateStyle();
    });
    $("#sort a").click(function(ev) {
        if ($(this).attr("rel") == "default") {
            $("#sort a[rel=\"default\"]").attr("class", "on");
            $("#sort a[rel=\"imdb\"]").attr("class", "off");
            sortMode = "default";
        } else {
            $("#sort a[rel=\"default\"]").attr("class", "off");
            $("#sort a[rel=\"imdb\"]").attr("class", "on");
            sortMode = "imdb";
        }
        netChart.updateStyle();
    });
    
    function updateHistory() {
        historyFrom = historySlider.rangeSlider("min");
        filters.yearFrom = Math.round(historyFrom);
        historyTo = historySlider.rangeSlider("max");
        filters.yearTo = Math.round(historyTo);
        netChart.updateFilters();
        netChart.updateStyle();
        $("#yearFrom").html(filters.yearFrom);
        $("#yearTo").html(filters.yearTo);
    }

    function getPieChartDimensions(node) {
        var dimensions = netChart.getNodeDimensions(node);
        var output = {
            area: {
                left: dimensions.x - dimensions.radius * 5,
                top: dimensions.y - dimensions.radius * 5,
                width: dimensions.radius * 10,
                height: dimensions.radius * 10
            },
            pie: {
                radius: dimensions.radius + (dimensions.radius / 2),
                innerRadius: dimensions.radius
            }
        };
        return output;
    }

    function hidePieChart() {
        pieChart.updateSettings({ area: { left: -100, top: -100, width: 0, height: 0 } });
        pieChartSettings = null;
        pieChartNode = null;
        activeSlice = null;
    }
    
    function netChartDClick(event) {
        hidePieChart();
        if (event.clickNode) {
            netChart.clearFocus();
            netChart.addFocusNode(event.clickNode);
        }
    }

    function updatePieChart() {
        
        var selectedNodes = netChart.selection();
        if (selectedNodes.length === 0) {
            hidePieChart();
            return;
        }
        var currentNode = selectedNodes[0];
        if (currentNode.focused) {
            pieChartData = getPieData(currentNode.data);
            if (currentNode === pieChartNode) {
                return;
            }
            pieChartNode = currentNode;
            pieChartSettings = getPieChartDimensions(currentNode);
            pieChartSettings.data = { preloaded: { subvalues: pieChartData } };
            pieChartSettings.navigation = {}; // required so that PieChart drilldown level is reset.
            pieChart.updateSettings(pieChartSettings);
            activeNode = currentNode;
        } else {
            hidePieChart();
            netChart.addFocusNode(currentNode);
        }
    }

    function getPieData(data) {
        var values = [];
        if (data.categories) {
            for (var cat in data.categories) {
                var count = data.categories[cat];
                var params = {
                    id: cat,
                    value: count,
                    style: {
                        label: {
                            text: cat
                        }
                    }
                };
                values.push(params);
            }
        } else if (data.genre) {
            for (var i in data.genre) {
                var params = {
                    id: data.genre[i],
                    value: 1,
                    style: {
                        label: {
                            text: data.genre[i]
                        }
                    }
                };
                values.push(params);
            }
        }
        return values;
    }

    function movePieChart() {
        var selectedNodes = netChart.selection();
        if (selectedNodes.length === 0) {
            return;
        }
        var currentNode = selectedNodes[0];
        if (currentNode.focused && pieChartSettings != null && currentNode == activeNode) {
            var settings = getPieChartDimensions(currentNode);
            var currentArea = settings.area;
            if (pieChartSettings
                    && pieChartSettings.area.left === currentArea.left
                    && pieChartSettings.area.top === currentArea.top
                    && pieChartSettings.pie.radius === settings.pie.radius) {
                return;
            }
            pieChartSettings = settings;
            pieChart.updateSettings(settings);
        } else {
            hidePieChart();
        }
    }

    var netChart = new NetChart({
        container: $("#demo")[0],
        data: {
            preloadNodeLinks: true,
            dataFunction: function(nodes, success, error) {
                jQuery.ajax({
                    type: "GET",
                    //url: "inc/api/api",
                    url: "https://cpapi.zoomcharts.com/moviedb/api",
                    data: {method: "load", id: nodes.join(",")},
                    success: success,
                    error: error
                });
            }
        },
        area: {
            paddingTop: 100,
            paddingLeft: 40,
            paddingRight: 40,
            paddingBottom: 40
        },
        navigation: {
            mode: "focusnodes",
            initialNodes: [],
            focusNodeExpansionRadius: 1,
            focusNodeTailExpansionRadius: 0.3,
            numberOfFocusNodes: 10
        },
        toolbar: {
            enabled: true
        },
        style: {
            nodeDetailMinSize: 20,
            nodeDetailMinZoom: 0.00001,
            nodeRadiusExtent: [10, 150],
            nodeAutoScaling: "none",
            node: {fillColor: null},
            link: {fillColor: "#09c"},
            nodeHovered: {fillColor: undefined, shadowBlur: 0, shadowColor: "pink"},
            linkHovered: {shadowBlur: 0, shadowColor: "pink"},
            nodeLabel: {scaleWithZoom: true, aspectRatio: 5, textStyle: {fillColor: "black", font: "8px Arial"}, backgroundStyle: {fillColor: "#eee", lineWidth: 6, lineColor: "#eee"}},
            hiddenLinks: {lineColor: "gray", lineWidth: 2, size: 6},
            selection: {fillColor: null, sizeConstant: 5, sizeProportional: 0.1},
            removedColor: "#333",
            nodeStyleFunction: function(node) {
                node = nodeRadius(node);
                node = nodeStyle(node);
            },
            linkStyleFunction: function(link) {
                link.relevance = Math.min(link.from.relevance, link.to.relevance);
            }
        },
        interaction: {
            resizing: {
                enabled: false
            },
            selection: {
                lockNodesOnMove: false
            },
            zooming: {
                zoomExtent: [0.1, 3],
                autoZoomExtent: [1.4, 2],
                autoZoomSize: 1,
                autoZoomAfterClick: true
            }
        },
        layout: {
            nodeSpacing: 9,
            aspectRatio: false
        },
        nodeMenu: {
            enabled: true,
            showData: false,
            contentsFunction: nodeMenu
        },
        events: {
            onDoubleClick: netChartDClick,
            onClick: updatePieChart,
            onPositionChange: movePieChart
        },
        auras: {
            enabled: false,
            cellSize: 8,
            overlap: true,
            style: {
                "Crime": {
                    fillColor: "rgba(47,195,47,0.3)"
                },
                "Documentary": {
                    fillColor: "rgba(234,180,4,0.3)"
                },
                "Comedy": {
                    fillColor: "rgba(176,220,11,0.3)"
                },
                "Drama": {
                    fillColor: "rgba(111,82,184,0.3)"
                },
                "Biography": {
                    fillColor: "rgba(236,46,46,0.3)"
                },
                "Short": {
                    fillColor: "rgba(213,66,155,0.3)"
                },
                "Romance": {
                    fillColor: "rgba(222,103,44,0.3)"
                },
                "Action": {
                    fillColor: "rgba(28,124,213,0.3)"
                },
                "Western": {
                    fillColor: "rgba(86,185,247,0.3)"
                },
                "Fantasy": {
                    fillColor: "rgba(10,232,235,0.3)"
                }
            }
        }
    });

    var pieChart = new PieChart({
        parentChart: netChart,
        data: {
            preloaded: {
                subvalues: [],
                sortField: "value"
            }
        },
        labels: {
            enabled: false
        },
        icons: {
            sizeExtent: [8, 30]
        },
        pie: {
            adaptiveRadius: false,
            styleFunction: function(pie) {
                if (pie.parentSlice) {
                    pie.sliceColors = [pie.parentSlice.fillColor];
                    pie.colorDistribution = "gradient";
                }
            }
        },
        slice: {
            backgroundStyle: {
                fillColor: "rgba(0xe2, 0xe2, 0xe2, 0.6)",
                fillColor2: "rgba(0xe0, 0xe0, 0xe0, 0.6)"
            },
            connectorStyle: {lineColor: "#aaa"},
            style: {
                label: {
                    textStyle: {font: "14px arial"},
                    backgroundStyle: {fillColor: "rgba(220,220,220,0.6)"}
                }
            }
        },
        interaction: {
            resizing: {
                enabled: false
            },
            others: {
                minSliceFraction: 0.03
            }
        },
        events: {
            onSelectionChange: pieChartSelection
        }
    });
    
    function pieChartSelection(event){
        if (event.selection.length > 0){
            activeSlice = event.selection[0];
        } else {
            if (event.pie.parentSlice){
                activeSlice = event.pie.parentSlice;
            } else {
                activeSlice = null;
            }
        }
        netChart.updateSettings({style:{nodeStyleFunction: function(node){ nodeRadius(node); nodeStyle(node); }}});
    }
    
    var sortMode = "imdb";
    var searchText = "";
    var searchIds = [];
    var starString = String.fromCharCode(9733);
    var activeNode = null;
    var lastNode = null;
    var pieChartData = null;
    var pieChartSettings = null;
    var pieChartNode = null;
    var netChartNode = null;
    var activeSlice = null;
    var historyFrom = 1900;
    var historyTo = 2014;
    var year = 0;
    
    
    var filters = {
        timeStart: new Date().getTime() - 365 * 86400 * 1000,
        timeEnd: new Date().getTime(),
        imdb: 8,
        yearFrom: historyFrom,
        yearTo: historyTo
    };
    var rangeSliderParams = {
        arrows: false,
        bounds: {
            min: historyFrom,
            max: historyTo
        },
        defaultValues: {
            min: filters.yearFrom,
            max: filters.yearTo
        }
    };
    
    search();
    hideOverlay();
    var historySlider = $("#years").rangeSlider(rangeSliderParams);
    $("#years").bind("valuesChanging", updateHistory);
    $(".DVSL-Menu").draggable();
};

if (window.location.href.indexOf("headless") > -1) {
    $("body").addClass("embed");
} else {
    $("body").addClass("standalone");
}
