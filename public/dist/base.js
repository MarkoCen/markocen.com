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

    window.mc.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json').then(function(result){console.log(result)})


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