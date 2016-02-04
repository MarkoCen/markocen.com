;(function (_) {

    function MC(ele){
        var selectEle = _.isString(ele) ? document.querySelectorAll(ele) : ele;
        return selectEle == null ? false : new MCElement(selectEle);
    }

    MC.get = function (url){
        return httpRequestBase('GET', url, null);
    };

    MC.post = function (url, data){
        return httpRequestBase('POST', url, data);
    };

    MC.scrollTo = function(ele, interval){
        var docEle = _.isNode(ele) ? ele : document.querySelector(ele);
        var delay = interval || 200;
        var top = docEle.offsetTop;
        var difference = top - document.body.scrollTop;
        var perTick = difference / delay * 10;

        var timeoutID = setTimeout(function() {
            document.body.scrollTop += perTick;
            if (document.body.scrollTop === top){
                clearTimeout(timeoutID);
                return;
            }
            MC.scrollTo(docEle, delay - 10);
        }, 10);
    };

    function MCElement(ele){
        this.ele = ele;
        return this;
    }

    MCElement.prototype.css = function(styleObj){
        if(_.isNodeList(this.ele)){
            _.forEach(this.ele, function(ele){
                _.forEach(styleObj, function(value, key){
                    ele.style[key] = value;
                })
            })
        }
        return this;
    };

    MCElement.prototype.hasClass = function (className) {
        var classList = [];
        classList = classList.concat(this.ele.className.split(" "));
        return classList.indexOf(className) > -1;
    }

    MCElement.prototype.addClass = function (className) {
        if( _.isNode(this.ele)){
            this.ele.className += " " + className;
        }
        if(_.isNodeList(this.ele)){
            _.forEach(this.ele, function (ele) {
                ele.className += " " + className;
            })
        }
        return this;
    };

    MCElement.prototype.find = function (query) {
        if(_.isNode(this.ele)){
            return new MCElement(document.querySelectorAll(query));
        }
    };

    MCElement.prototype.removeClass = function (className) {
        if(_.isNode(this.ele)){
            var classes = this.ele.className.split(" ");
            var index = classes.indexOf(className);
            if(index > -1){
                classes.splice(index, 1);
                this.ele.className = classes.join(' ');
            }
        }
        if(_.isNodeList(this.ele)){
            _.forEach(this.ele, function (ele) {
                var classes = ele.className.split(" ");
                var index = classes.indexOf(className);
                if(index > -1){
                    classes.splice(index, 1);
                    ele.className = classes.join(' ');
                }
            })
        }
        return this;
    };

    MCElement.prototype.on = function(eventName, eventCallback){
        if(_.isFunction(eventCallback)){
            _.forEach(this.ele, function(ele){
                ele.addEventListener(eventName, eventCallback.bind(ele), false);
            })
        }
    };

    function httpRequestBase(method, url, data){
        var xmlhttp = new XMLHttpRequest();
        var defer = _.defer();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if(xmlhttp.status === 200){
                    defer.resolve(JSON.parse(xmlhttp.responseText))
                }else{
                    defer.reject(xmlhttp.statusText)
                }
            }
        };
        xmlhttp.open(method.toUpperCase(), url, true);
        xmlhttp.setRequestHeader("Accept", "application/json");
        xmlhttp.send(JSON.stringify(data));
        return defer.promise;
    }

    window.mc = window.$ = MC;


})((function(){

    var Util = function(){};

    var Defer = function(){
        this.sCallbackQueue = [];
        this.fCallbackQueue = [];
        var self = this;
        this.promise = {
            then: function(sCallback, fCallback){
                if(arguments.length === 1){
                    if(typeof sCallback === 'function'){
                        self.sCallbackQueue.push(sCallback);
                    }
                } else if(arguments.length === 2){
                    if(typeof sCallback === 'function'){
                        self.sCallbackQueue.push(sCallback);
                    }
                    if(typeof fCallback === 'function'){
                        self.fCallbackQueue.push(fCallback);
                    }
                }
            }
        };

    };

    Defer.prototype = {
        constructor: Defer,
        resolve: function(result){
            for(var i = 0; i < this.sCallbackQueue.length; i++){
                this.sCallbackQueue[i].call(this, result);
            }
            this.flush();
        },
        reject: function(err){
            for(var i = 0; i < this.fCallbackQueue.length; i++){
                this.fCallbackQueue[i].call(this, err);
            }
            this.flush();
        },
        flush: function(){
            this.sCallbackQueue = [];
            this.fCallbackQueue = [];
        }
    };

    Util.prototype = {
        constructor: Util,
        isFunction: function(fn){
            return typeof fn === 'function'
        },
        isObject: function(obj){
            return Object.prototype.toString.call(obj) === '[object Object]'
        },
        isArray: function(array){
            return Object.prototype.toString.call(array) === '[object Array]'
        },
        isString: function(string){
            return typeof string === 'string'
        },
        isUndefined: function(obj){
            return obj === undefined;
        },
        isNode: function (node) {
            return node && node.nodeType &&
                (node.nodeType === 1 || node.nodeType === 11);
        },
        isNodeList: function(eles){
            return eles instanceof window.NodeList;
        },
        forEach: function(arrayObject, callback){
            if(this.isFunction(callback)){
                if(this.isArray(arrayObject) || this.isNodeList(arrayObject)){
                    for(var i = 0; i < arrayObject.length; i++){
                        callback(arrayObject[i], i);
                    }
                }
                if(this.isObject(arrayObject)){
                    var keys = Object.keys(arrayObject);
                    for(var j = 0; j < keys.length; j++){
                        callback(arrayObject[keys[j]], keys[j]);
                    }
                }
            }
        },
        defer: function(){
            return new Defer();
        }
    };

    return new Util();
})());