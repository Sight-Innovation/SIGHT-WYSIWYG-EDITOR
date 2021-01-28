class editor {
    constructor(tagId) {
        
        this.tagId = tagId; //alert(tagId)
        this.imgParId; this.imgNo; this.imgCnt; this.imgNum = 0;
        this.spStArr = [0, 0, 0]; this.spPaNum = 0;this.ul = 0; this.spChNum = 0; this.lCnt = 0; this.aNum = 0; this.aId; this.aSp = 0;
        this.n; this.nu = 0; this.tN; this.parId = null; this.mSpan = document.querySelectorAll("#" + tagId + " .mSpan");

        var StateUndoRedo = function () {
            var init = function (opts) {
                var self = this;
                self.opts = opts;
                if (typeof (self.opts['undo_disabled']) == 'undefined') {
                    //self.opts['undo_disabled'] = function() {};
                }
                if (typeof (self.opts['undo_enabled']) == 'undefined') {
                    self.opts['undo_enabled'] = function () { };
                }
                if (typeof (self.opts['redo_disabled']) == 'undefined') {
                    self.opts['redo_disabled'] = function () { };
                }
                if (typeof (self.opts['redo_enabled']) == 'undefined') {
                    self.opts['redo_enabled'] = function () { };
                }
                if (typeof (self.opts['restore']) == 'undefined') {
                    self.opts['restore'] = function () { };
                }
                self.opts['undo_disabled']();
                self.opts['redo_disabled']();
            }
            var add = function (state) {
                var self = this;
                if (typeof (self.states) == 'undefined') {
                    self.states = [];
                }
                if (typeof (self.state_index) == 'undefined') {
                    self.state_index = -1;
                }
                self.state_index++;
                self.states[self.state_index] = state;
                self.states.length = self.state_index + 1;
                if (self.state_index > 0) {
                    self.opts['undo_enabled']();
                }
                self.opts['redo_disabled']();
            }
            var undo = function () {
                var self = this;
                if (self.state_index > 0) {
                    self.state_index--;
                    if (self.state_index == 0) {
                        self.opts['undo_disabled']();
                    } else {
                        self.opts['undo_enabled']();
                    }
                    self.opts['redo_enabled']();

                    self.opts['restore'](self.states[self.state_index]);
                }
            }
            var redo = function () {
                var self = this;
                if (self.state_index < self.states.length) {
                    self.state_index++;
                    if (self.state_index == self.states.length - 1) {
                        self.opts['redo_disabled']();
                    } else {
                        self.opts['redo_enabled']();
                    }
                    self.opts['undo_enabled']();

                    self.opts['restore'](self.states[self.state_index]);
                }
            }

            var restore = function () {
                var self = this;
                self.opts['restore'](self.states[self.state_index]);
            }
            var clear = function () {
                var self = this;
                self.state_index = 0;
                //self.states = [];
            }

            return {
                init: init,
                add: add,
                undo: undo,
                redo: redo,
                restore: restore,
                clear: clear
            };
        };
        //initialize object
        this.o = new StateUndoRedo();
        this.o.init({
            'undo_disabled': function () {
                //alert(this.tagId + "/" + tagId);
                //make the undo button hidden
                document.querySelector("#" + tagId + " .undo_btn").disabled = true;
            },
            'undo_enabled': function () {
                //make the undo button visible
                document.querySelector("#" + tagId + " .undo_btn").disabled = false;
            },
            'redo_disabled': function () {
                //make the redo button hidden
                document.querySelector("#" + tagId + " .redo_btn").disabled = true;
            },
            'redo_enabled': function () {
                //make the redo button visible
                document.querySelector("#" + tagId + " .redo_btn").disabled = false;
            },
            'restore': function (state) {
                //replace the current content with the restored state content
                document.querySelector("#" + tagId + " .content").innerHTML = state;
            }
        });
        //initialize first state
        this.o.add(document.querySelector("#" + tagId + " .content").innerHTML);
        this.o.restore();
        this.o.clear();

        //bind click events for undo/redo buttons
       /* document.querySelector("#" + tagId + " .undo_btn").addEventListener("click", function () {
            this.o.undo();
        });*/
       /* document.querySelector("#" + tagId + " .redo_btn").addEventListener("click", function () {
            this.o.redo();
        });*/

        //bind change events for content element
    }

    undo() {
        this.o.undo();
    }

    redo() {
        this.o.redo();
    }

    get tId() {
        return this.tagId;
    }

    showPos() {
        //alert(this.tagId);
        document.querySelector("#" + this.tagId + " .link .linkDropD").style.display = "none"; this.lCnt = 0

        var sel1 = this.n = window.getSelection().getRangeAt(0).startOffset;

        this.nu = 1;
        if (window.getSelection().toString().length == 0) {
            var sel = window.getSelection().anchorNode; this.parId = sel.parentNode;
            this.tN = sel.parentNode.TEXT_NODE;
            var con = sel.parentNode.childNodes.length;
            for (var i = 0; i <= con; i++) {
                if (sel.parentNode.childNodes[i] == sel) {
                    this.tN = i;
                }
            }
            for (var i = 0; i < this.mSpan.length; i++) {
                if (this.parId.classList.contains(this.mSpan[i].id)) {
                    this.mSpan[i].className += " light";
                    this.spStArr[i] = 1;
                }
                else {
                    this.mSpan[i].classList.remove("light");
                    this.spStArr[i] = 0;
                }
            }
        }
        else {
            var sel = window.getSelection();
            var stNode = sel.getRangeAt(0).startContainer; //alert(stNode.parentNode.id);
            var enNode = sel.getRangeAt(0).endContainer;
            if (stNode.parentNode.id.localeCompare("test") == 0 && enNode.parentNode.id.localeCompare("test") == 0) { }
            else if (stNode.parentNode.id.localeCompare(enNode.parentNode.id) == 0) {
                for (var i = 0; i < this.mSpan.length; i++) {
                    if (stNode.parentNode.classList.contains(mSpan[i].id)) {
                        this.mSpan[i].className += " light";
                        this.spStArr[i] = 1;
                    }
                    else {
                        this.mSpan[i].classList.remove("light");
                        this.spStArr[i] = 0;
                    }
                }
            }
        }
        var imgs = document.querySelectorAll("#" + this.tagId + " .imgDiv");
        if (imgs.length > 0) {
            for (var k = 0; k < imgs.length; k++) {
                var divIm = document.querySelector("#" + this.tagId + " #" + imgs[k].id + " img");
                if (divIm == null) {
                    imgs[k].parentElement.removeChild(imgs[k]);
                }

                var imgse = document.querySelectorAll("#" + this.tagId + " .imgDiv .resizable");
                for (var j = 0; j < imgse.length; j++) {
                    var divIm = document.querySelector("#" + this.tagId + " #" + imgs[k].id + " > .resizable:nth-child(" + (j + 1).toString() + ") img");
                    if (divIm == null) {
                        imgse[j].parentElement.removeChild(imgse[j]);
                    }
                }
            }
            
        }
    }

    showLink() {
        if (this.lCnt == 0) {
            document.querySelector("#" + this.tagId + " .link .linkDropD").style.display = "block";
            this.lCnt++; this.aId = "";
            var sel = window.getSelection();
            if (sel.toString().length != 0) {
                var stNode = sel.getRangeAt(0).startContainer; //alert(stNode.parentNode.id);
                var enNode = sel.getRangeAt(0).endContainer; //alert(enNode.textContent);
                if (stNode.parentNode.id.localeCompare(enNode.parentNode.id) == 0) {
                    if (stNode.parentNode.id.slice(0, 6).localeCompare("aSpan-") == 0 || stNode.parentNode.id.slice(0, 2).localeCompare("a-") == 0) {
                        this.aId = stNode.parentNode.id;
                    }
                    else {
                        var element = document.createElement("span");
                        this.aId = element.id = "aSpan-" + this.aSp.toString(); this.aSp++;
                        window.getSelection().getRangeAt(0).surroundContents(element);
                    }
                }
            }
        }
        else {
            document.querySelector("#" + this.tagId + " .link .linkDropD").style.display = "none"; this.lCnt = 0
        }
    }

    link() {
        var ahref = document.querySelector("#" + this.tagId + " .ahref");
        if (this.aId.length > 2) {
            var aSpan = document.querySelector("#" + this.tagId + " #" + this.aId);
            if (this.aId.slice(0, 2).localeCompare("a-") != 0) {
                var element = document.createElement("a");
                element.id = "a-" + this.aNum.toString(); this.aNum++;
                element.setAttribute("href", ahref.value);

                var setpos = document.createRange();

                setpos.setStart(aSpan.childNodes[0], 0);
                setpos.setEnd(aSpan.childNodes[0], aSpan.innerHTML.length);
                setpos.surroundContents(element);
            }
            else {
                aSpan.setAttribute("href", ahref.value);
            }
        }
        return false;
    }

    unlink() {
        //alert(aId)
        if (this.aId.slice(0, 2).localeCompare("a-") == 0) {
            var aSpan = document.querySelector("#" + this.tagId + " #" + this.aId);
            aSpan.parentNode.innerHTML = aSpan.innerHTML;
        }
        else if (this.aId.slice(0, 6).localeCompare("aSpan-") == 0) {
            var al = document.querySelector("#" + this.aId + " > a");
            al.parentNode.innerHTML = al.innerHTML;
        }
        return false;
    }

    setFont() {
        var fontFam = document.querySelector("#" + this.tagId + " .fontFamily");
        var sel = window.getSelection();
        if (window.getSelection().toString().length > 0) {

            var stNode = sel.getRangeAt(0).startContainer; //alert(stNode.parentNode.id);
            var enNode = sel.getRangeAt(0).endContainer; //alert(enNode.textContent);
            if (stNode.parentNode.id.localeCompare("test") == 0 && enNode.parentNode.id.localeCompare("test") == 0) {
                var element = document.createElement("span");
                element.id = "span-" + this.spPaNum.toString(); this.spPaNum++;
                element.style.fontFamily = fontFam.value.toString();

                window.getSelection().getRangeAt(0).surroundContents(element)
            }
            else if (stNode.parentNode.id.localeCompare(enNode.parentNode.id) == 0) {
                stNode.parentNode.style.fontFamily = fontFam.value.toString();
            }
            this.o.add(document.querySelector("#" + this.tagId + " .content").innerHTML);
        }
    }

    orderedList(id,tag){
        this.o.add(document.querySelector("#" + this.tagId + " .content").innerHTML);
        var sel = window.getSelection();
        if(window.getSelection().toString().length > 0){
            var stNode = sel.getRangeAt(0).startContainer; //alert(stNode.parentNode.id);
            var enNode = sel.getRangeAt(0).endContainer; //alert(enNode.textContent);
            if (stNode.parentNode.id.localeCompare("test") == 0 && enNode.parentNode.id.localeCompare("test") == 0) {
                var element = document.createElement("UL");
                var el = document.createElement("LI");
                el.appendChild(element);
                element.id = "ul-" + this.ul.toString(); //this.ul++;
                //element.style.textAlign = id;
                //element.style.display = "block";
                window.getSelection().getRangeAt(0).surroundContents(element);
                var uli = document.getElementById("ul-" + this.ul);
                
                var setpos = document.createRange();

                setpos.setStart(uli.childNodes[0], 0);
                setpos.setEnd(uli.childNodes[0], uli.innerHTML.length);
                setpos.surroundContents(el);this.ul++;
            }
            else if (stNode.parentNode.id.localeCompare(enNode.parentNode.id) == 0) {
                stNode.parentNode.style.textAlign = id;
                stNode.parentNode.style.display = "block";
            }
        }
        else{
            
            var test = document.querySelector("#" + tag.tagId + " .content > p");
                //var con = document.querySelector("#" + this.tagId + " .content");
                //var c = con.innerHTML;

                var element = document.createElement("UL");
                element.id = "ul-" + this.ul.toString();

                //test.setAttribute("innerHTML", test.innerHTML);
                test.innerHTML = test.innerHTML;
                var setpos = document.createRange();

                setpos.setStart(tag.imgParId.childNodes[tag.imgNo], tag.n);
                setpos.setEnd(tag.imgParId.childNodes[tag.imgNo], tag.n);
                setpos.surroundContents(element); //alert(setpos); 

                document.getElementById("ul-" + this.ul).innerHTML = "<li> </li>";
                //document.querySelector("#" + tag.tagId + " #divImg-" + tag.imgNum.toString()).innerHTML = "<div class='resizable'><div class='resizer top-left' ></div ><div class='resizer top-right'></div><div class='resizer bottom-left'></div><div class='resizer bottom-right'></div><img id='img-" + tag.imgNum.toString() + "' /></div >";
                this.ul++;
        }
    }

    txAlign(id) {
        this.o.add(document.querySelector("#" + this.tagId + " .content").innerHTML);
        var sel = window.getSelection();
        if (window.getSelection().toString().length > 0) {

            var stNode = sel.getRangeAt(0).startContainer; //alert(stNode.parentNode.id);
            var enNode = sel.getRangeAt(0).endContainer; //alert(enNode.textContent);
            if (stNode.parentNode.id.localeCompare("test") == 0 && enNode.parentNode.id.localeCompare("test") == 0) {
                var element = document.createElement("span");
                element.id = "span-" + this.spPaNum.toString(); this.spPaNum++;
                element.style.textAlign = id;
                element.style.display = "block";

                window.getSelection().getRangeAt(0).surroundContents(element)
            }
            else if (stNode.parentNode.id.localeCompare(enNode.parentNode.id) == 0) {
                stNode.parentNode.style.textAlign = id;
                stNode.parentNode.style.display = "block";
            }
        }
        else {
            if (id.localeCompare("left") == 0) {
                var test = document.querySelector("#" + this.tagId + " .content p");
                var setpos = document.createRange();
                if (this.parId == null) {
                    setpos.setStart(test.childNodes[0], 0);
                }
                else {
                    test.innerHTML += '<span id="span-' + this.spPaNum.toString() + '"> </span>';

                    var inSpan = document.querySelector("#" + this.tagId + " #span-" + this.spPaNum.toString()); this.spPaNum++;
                    setpos.setStart(inSpan.childNodes[0], 0);
                }
                setpos.collapse(true);
                sel.removeAllRanges();

                // Add range with respect to range object. 
                sel.addRange(setpos); test.focus();
            }
        }
        this.o.add(document.querySelector("#" + this.tagId + " .content").innerHTML);
        return false;
    }

    changeText(tag) {
        var test = document.querySelector("#" + this.tagId + " .content p");

        this.o.add(document.querySelector("#" + this.tagId + " .content").innerHTML);
        if (this.nu == 1) {
            this.nu = 0;
            if (this.parId != null) {
                if (this.parId.id.localeCompare("test") == 0) {
                    var txStyle = "";
                    for (var i = 0; i < this.mSpan.length; i++) {
                        if (this.mSpan[i].classList.contains("light")) {
                            txStyle += " " + this.mSpan[i].id;
                        }
                    }
                    if (txStyle.length > 2) {
                        test.innerHTML = test.innerHTML;
                        tag.addStyle(txStyle);
                    }
                    else {

                    }
                }
                else {

                }
            }
            //test.innerHTML = test.innerHTML;
            //addStyle();
        }
        else if (this.nu == 2) {//For alignment

        }
        else if (this.nu == 3) { //For font family

        }
        else if (this.nu == 4) {//For font size

        }
    }

    chTx(id, num) {
        this.o.add(document.querySelector("#" + this.tagId + " .content").innerHTML);
        if (this.spStArr[num] == 0) {
            id.className += " light";
            this.spStArr[num] = 1;
        }
        else {
            id.classList.remove("light");
            this.spStArr[num] = 0;
        }
        var sel = window.getSelection();
        if (sel.toString().length != 0) {
            var stNode = sel.getRangeAt(0).startContainer; //alert(stNode.parentNode.id);
            var enNode = sel.getRangeAt(0).endContainer; //alert(enNode.textContent);
            if (stNode.parentNode.id.localeCompare("test") == 0 && enNode.parentNode.id.localeCompare("test") == 0) {
                var element = document.createElement("span");
                element.id = "span-" + this.spPaNum.toString(); this.spPaNum++;
                if (this.spStArr[num] == 1) {
                    element.className += " " + id.id;
                }
                else {
                    element.classList.remove(id.id);
                }
                window.getSelection().getRangeAt(0).surroundContents(element)
            }
            else if (stNode.parentNode.id.localeCompare(enNode.parentNode.id) == 0) {
                if (this.spStArr[num] == 1) {
                    stNode.parentNode.className += " " + id.id;
                }
                else {
                    stNode.parentNode.classList.remove(id.id);
                }
            }
            else {
                var setpos = document.createRange();

                var element = document.createElement("span");
                element.id = stNode.parentNode.id + "-" + stNode.parentNode.childNodes.length;
                if (this.spStArr[num] == 1) {
                    element.className += " " + id.id;
                }
                else {
                    element.classList.remove(id.id);
                }
                setpos.setStart(stNode.parentNode.childNodes[0], sel.getRangeAt(0).startOffset);
                try {
                    setpos.setEnd(stNode.parentNode.childNodes[0], stNode.parentNode.innerHTML.length);
                }
                catch (ex) {
                    setpos.setEnd(stNode.parentNode.childNodes[0], stNode.parentNode.innerHTML.length - 1);
                }
                setpos.surroundContents(element);
                var nexSib = stNode.parentNode.nextSibling; var txD = 0;
                while (!nexSib.isSameNode(enNode) || !nexSib.isSameNode(enNode.parentNode)) {
                    //alert(nexSib.textContent);
                    if (nexSib.id == undefined) {
                        if (nexSib.textContent.length == 0) {
                            nexSib = nexSib.nextSibling;
                        }
                        else {
                            var nexSib2 = nexSib;
                            nexSib = nexSib.nextSibling;
                            var setpos3 = document.createRange();
                            setpos3.setStart(nexSib2, 0);
                            setpos3.setEnd(nexSib2, nexSib2.textContent.length - 1);
                            var element3 = document.createElement("span");
                            if (this.spStArr[num] == 1) {
                                element3.className += " " + id.id;
                            }
                            else {
                                element3.classList.remove(id.id);
                            }
                            element3.id = "span-" + this.spPaNum.toString(); this.spPaNum++;
                            setpos3.surroundContents(element3); txD = 1;
                        }
                    }
                    else {
                        nexSib.className += " " + id.id;
                        nexSib = nexSib.nextSibling;
                    }
                    //nexSib = nexSib.nextSibling;
                    if (nexSib.isSameNode(enNode) || nexSib.isSameNode(enNode.parentNode)) {
                        break;
                    }
                }
                var setpos2 = document.createRange(); var element2 = document.createElement("span");
                if (this.spStArr[num] == 1) {
                    element2.className += " " + id.id;
                }
                else {
                    element2.classList.remove(id.id);
                }
                setpos2.setStart(nexSib, 0); //alert(sel.getRangeAt(0).endOffset + " \ " + nexSib.textContent + " \ " + nexSib.id);
                if (txD == 1) {
                    setpos2.setEnd(nexSib.childNodes[0], sel.getRangeAt(0).endOffset - 1);
                }
                else
                    setpos2.setEnd(nexSib, sel.getRangeAt(0).endOffset);
                element2.id = "span-" + this.spPaNum.toString(); this.spPaNum++;
                setpos2.surroundContents(element2);

            }
        }
        else {
            var test = document.querySelector("#" + this.tagId + " .content p");
            var setpos = document.createRange();
            if (this.parId == null) {
                setpos.setStart(test.childNodes[0], this.n);
            }
            else {
                setpos.setStart(this.parId.childNodes[this.tN], this.n);
            }
            setpos.collapse(true);
            sel.removeAllRanges();

            // Add range with respect to range object. 
            sel.addRange(setpos); test.focus();
        }
        return false;
    }

    addStyle(tSty) {
        if (window.getSelection) {
            var test = document.querySelector("#" + this.tagId + " .content p");
            var con = document.querySelector("#" + this.tagId + " .content");
            var c = con.innerHTML;
            //con.innerHTML = ""; //con.innerHTML = c;
            //alert(document.getElementById("content").innerHTML); alert(test.innerHTML);
            var sel = window.getSelection();
            if (sel.getRangeAt) {

                var element = document.createElement("span");
                element.className = tSty;
                element.id = "span-" + this.spPaNum.toString(); this.spPaNum++;

                //test.setAttribute("innerHTML", test.innerHTML);
                test.innerHTML = test.innerHTML;
                var setpos = document.createRange();

                setpos.setStart(this.parId.childNodes[this.tN], this.n);
                setpos.setEnd(this.parId.childNodes[this.tN], this.n + 1);
                setpos.surroundContents(element); //alert(setpos);
                // Collapse range within its boundary points 
                // Returns boolean 
                setpos.collapse(true);
                sel.removeAllRanges();

                // Add range with respect to range object. 
                sel.addRange(setpos);
                var g = document.querySelector("#" + this.tagId + " #" + element.id);
                var setPos2 = document.createRange();
                setPos2.setStart(g.childNodes[0], 1);
                setPos2.collapse(true);
                sel.removeAllRanges();
                sel.addRange(setPos2);

                test.focus();
            }
        }
    }

    getImgPos() {
        this.imgCnt = this.n; this.imgNo = this.tN; this.imgParId = this.parId; //this.imgNumn = this.imNu;
    }

    uploadImage(input, tag) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                //this.addImg2();
                var test = document.querySelector("#" + tag.tagId + " .content > p");
                //var con = document.querySelector("#" + this.tagId + " .content");
                //var c = con.innerHTML;

                var element = document.createElement("div");
                element.className = "imgDiv";
                element.id = "divImg-" + tag.imgNum.toString();

                //test.setAttribute("innerHTML", test.innerHTML);
                test.innerHTML = test.innerHTML;
                var setpos = document.createRange();

                setpos.setStart(tag.imgParId.childNodes[tag.imgNo], tag.n);
                setpos.setEnd(tag.imgParId.childNodes[tag.imgNo], tag.n);
                setpos.surroundContents(element); //alert(setpos); 
                document.querySelector("#" + tag.tagId + " #divImg-" + tag.imgNum.toString()).innerHTML = "<div class='resizable'><div class='resizer top-left' ></div ><div class='resizer top-right'></div><div class='resizer bottom-left'></div><div class='resizer bottom-right'></div><img id='img-" + tag.imgNum.toString() + "' /></div >";


                document.querySelector("#" + tag.tagId + " #img-" + tag.imgNum.toString()).setAttribute("src", e.target.result);
                tag.makeResizableDiv('#' + tag.tagId + ' #divImg-' + tag.imgNum.toString() + ' .resizable')
                tag.imgNum++;
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    makeResizableDiv(div) {
        const element = document.querySelector(div);
        const resizers = document.querySelectorAll(div + ' .resizer')
        const minimum_size = 20;
        let original_width = 0;
        let original_height = 0;
        let original_x = 0;
        let original_y = 0;
        let original_mouse_x = 0;
        let original_mouse_y = 0;
        for (let i = 0; i < resizers.length; i++) {
            const currentResizer = resizers[i];
            currentResizer.addEventListener('mousedown', function (e) {
                e.preventDefault()
                original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
                original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
                original_x = element.getBoundingClientRect().left;
                original_y = element.getBoundingClientRect().top;
                original_mouse_x = e.pageX;
                original_mouse_y = e.pageY;
                window.addEventListener('mousemove', resize)
                window.addEventListener('mouseup', stopResize)
            })

            function resize(e) {
                if (currentResizer.classList.contains('bottom-right')) {
                    const width = original_width + (e.pageX - original_mouse_x);
                    const height = original_height + (e.pageY - original_mouse_y)
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                    }
                }
                else if (currentResizer.classList.contains('bottom-left')) {
                    const height = original_height + (e.pageY - original_mouse_y)
                    const width = original_width - (e.pageX - original_mouse_x)
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                    }
                    /*if (width > minimum_size) {
                        element.style.width = width + 'px'
                        element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                    }*/
                }
                else if (currentResizer.classList.contains('top-right')) {
                    const width = original_width + (e.pageX - original_mouse_x)
                    const height = original_height - (e.pageY - original_mouse_y)
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                    }
                    /* if (height > minimum_size) {
                         element.style.height = height + 'px'
                         element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                     }*/
                }
                else {
                    /*  const width = original_width - (e.pageX - original_mouse_x)
                      const height = original_height - (e.pageY - original_mouse_y)
                      if (width > minimum_size) {
                          element.style.width = width + 'px'
                          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                      }
                      if (height > minimum_size) {
                          element.style.height = height + 'px'
                          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                      }*/
                }
            }

            function stopResize() {
                window.removeEventListener('mousemove', resize)
            }
        }
    }

}
var sE = document.querySelectorAll(".sight-editor"); var ed = []; var iCn; var iCn2;
var dT21 = document.querySelectorAll(".defText");
if (sE.length > 0) {
    for (var i = 0; i < sE.length; i++) {
        aUe(sE[i]);
        if (sE[i].classList.contains("defText")) {
            document.querySelector("#" + sE[i].id + " .content p").innerHTML = sE[i].getAttribute("data-dt");;
        }
        ed[i] = new editor(sE[i].id); iCn2 = i; //alert(sE[i].id);
       /* sE[i].onkeydown = function(){
            var key = event.keyCode || event.charCode;

            if( key == 8 || key == 46 ){
                var sel = window.getSelection().anchorNode.parentElement.parentElement;
                if(sel.id.split('-')[0].localeCompare("ul") == 0){
                    var sel2 = window.getSelection().anchorNode.parentElement;
                    var lli = document.querySelector("#"+sel.id + " > li:last-child");
                    if(lli.isSameNode(sel2)){alert(lli.innerHTML) 
                        if( lli.innerHTML == null){ alert("great")
                            var setpos = document.createRange(); 
              
                            // Creates object for selection 
                            var set = window.getSelection(); 
                              
                            // Set start position of range 
                            setpos.setStart(sel.nextSibling, pos); 
                              
                            // Collapse range within its boundary points 
                            // Returns boolean 
                            setpos.collapse(true); 
                              
                            // Remove all ranges set 
                            set.removeAllRanges(); 
                              
                            // Add range with respect to range object. 
                            set.addRange(setpos); 
                              
                            // Set cursor on focus 
                            tag.focus(); 
                        }
                    }
                }
                if(sel.localeCompare("ul")==0){
                    alert("working")
                }
            }
        }   */
    }
    var bod = document.querySelector("body");
    alert(bod.innerHTML)
}
function initEd(id, nk) {
     //alert(iCn);
    if(nk == 0)
      iCn = iCn2;
    aUe(id);
    if (id.classList.contains("defText")) {
        document.querySelector("#" + id.id + " .content p").innerHTML = id.getAttribute("data-dt");
    } iCn++
    ed[iCn] = new editor(id.id); 
}
function initEd2(id) {
    sE = document.querySelectorAll(".sight-editor"); ed = []; iCn;
    dT21 = document.querySelectorAll(".defText");
    if (sE.length > 0) {
        for (var i = 0; i < sE.length; i++) {
            aUe(sE[i]);
            if (sE[i].classList.contains("defText")) {
                document.querySelector("#" + sE[i].id + " .content p").innerHTML = sE[i].getAttribute("data-dt");;
            }
            ed[i] = new editor(sE[i].id); iCn = i; //alert(sE[i].id);       
        }
        //Add modal code to body here
    }
}
function aUe(ta) {
    var cn = '<div id="si_toolbar2"><span class="upload-btn-wrapper" style = "float:left" ><button class="btn">Add Image</button>';
    cn += '<input type="file" name="myfile" onclick="getImgPos(this)" onchange="uploadImage(this)" /> </span >&nbsp; <button class="btn">Add Table</button> &nbsp; <button class="btn" onclick="return printFile(this); return false">Print</button></div >';
    cn += '<div id="si_toolbar" class="con editor"><button id="bold" class="bold mSpan" onclick="return chTx(this,0)">B</button><button id="italic" onclick="return chTx(this,1)" class="italics mSpan">I</button><button id="under" onclick="return chTx(this,2)" class="under mSpan">U</button><button class="oSpan" id="left" onclick="return txAlign(this)"><img src="Images/left adj.png" /></button><button class="oSpan" id="right" onclick="return txAlign(this)"><img src="Images/right adj1.jpg" /></button><button class="oSpan" id="center" onclick="return txAlign(this)"><img src="Images/center adj2.jpg" /></button>';
    cn += '<button id="justify" class="oSpan" onclick="return txAlign(this)"><img src="Images/justify2.png" /></button>';
    cn += '<span id="link" class="link"><img onclick="showLink(this)" src="Images/Link4.png" /><div id="linkDropD" class="linkDropD">';
    cn += '<input type="text" id="ahref" class="ahref" /><button onclick="return link()">Link</button><button onclick="return unlink()">Unlink</button></div></span>';
    cn +=  '<button type="button" id="undo_btn" class="undo_btn" onclick="undoC(this)"><img src="Images/return_left.png" /></button>';
    cn += '<button type="button" id="redo_btn" class="redo_btn" onclick="redoC(this)"><img src="Images/return_right.png" /></button>';
    cn += '<select id="fontFamily" class="fontFamily" onchange="setFont(this)"><option value="Arial">Arial</option> <option value="Book Antiqua">Book Antiqua</option>';
    cn += '<option value="Comic Sans Mc">Comic Sans Mc</option><option value="Courier New">Courier New</option>';
    cn += '<option value="Georgia">Georgia</option><option value="Helvetica">Helvetica</option><option value="Times New Roman">Times New Roman</option>';
    cn += '<option value="Verdana">Verdana</option></select><select id="fontSize" onchange="setFSize()">';
    cn += '<option value="12px">12px</option><option value="14px">14px</option><option value="16px">16px</option><option value="18px">18px</option><option value="20px">20px</option></select>';
    cn += '<button type="button" id="list_btn" class="list" onclick="listItems(this)"><img src="Images/download.jpg" /></button></div>';
    cn += '<br><div id="content" class="content"><p contenteditable="true" id="test" class="test" onclick="showPos(this)" oninput="changeText(this)" >Welcome to Sight-Editor (WYSIWYG EDITOR) by Sight-Innovation LLC.</p>';
    cn += '</div>';
    ta.innerHTML = cn;
                            
}
function undoC(id) {
    var cNo = getId(id);
    if (cNo != -1) {
        ed[cNo].undo();
    }
    return false;
}
function redoC(id) {
    var cNo = getId(id);
    if (cNo != -1) {
        ed[cNo].redo();
    }
    return false;
}
function getId(ic) {
    sE = document.querySelectorAll(".sight-editor");
    var pId = ic.parentElement.parentElement.id; //alert(pId);
    for (var c = 0; c < sE.length; c++) {//alert(sE[c].id)
        if (pId.localeCompare(sE[c].id) == 0) {
            //alert(c);
            return c;
        }
    }
    //alert("working")
    return -1;
}
function showPos(id) {
    var cNo = getId(id);// alert(cNo)
    if (cNo != -1) {
        ed[cNo].showPos();
    }
}
function link(id) {
    var cNo = getId(id.parentElement.parentElement);
    if (cNo != -1) {
        ed[cNo].link();
    }
    return false;
}
function unlink(id) {
    var cNo = getId(id.parentElement.parentElement);
    if (cNo != -1) {
        ed[cNo].unlink();
    }
    return false;
}
function showLink(id) {
    var cNo = getId(id.parentElement);
    if (cNo != -1) {
        ed[cNo].showLink();
    }
    return false;
}
function setFont(id) {
    var cNo = getId(id);
    if (cNo != -1) {
        ed[cNo].setFont();
    }
}
function listItems(id){
    var cNo = getId(id);
    if (cNo != -1) {
        ed[cNo].getImgPos();
        ed[cNo].orderedList(id,ed[cNo]);
    }
}
function txAlign(id) {
    var cNo = getId(id);
    if (cNo != -1) {
        ed[cNo].txAlign(id.id);
    }
    return false;
}
function changeText(id) {
    var cNo = getId(id);
    if (cNo != -1) {
        ed[cNo].changeText(ed[cNo]);
    }
}
function chTx(id, num) {
    var cNo = getId(id);
    if (cNo != -1) {
        ed[cNo].chTx(id,num);
    }
    return false;
}
function getImgPos(id) {
    var cNo = getId(id.parentElement);
    if (cNo != -1) {
        ed[cNo].getImgPos();
    }
    return false;
}
function uploadImage(id) {
    var cNo = getId(id.parentElement); //alert(ed[cNo].tagId)
    if (cNo != -1) {
        ed[cNo].uploadImage(id, ed[cNo]);
    }
}
function printFile(fi) {
    var tId = fi.parentElement.parentElement.id;
    print("#" + tId + " .content");
    return false;
}
function print(element) {
    var orgchart = document.querySelector(element);
    var docWin = window.open('', '', 'left=0, top=0, width=600,height=600, toolbar=0, scrollbars=0,status=0,dir=ltr');
    docWin.document.write(orgchart.innerHTML);
    var styl = '<link rel="stylesheet" type="text/css" href="/Editor/editor.css"/>';
    //styl += '<style>button{display:none;}</style>';
    docWin.document.querySelector("head").innerHTML = styl;
    docWin.document.close();
    docWin.focus();
    docWin.print();
    docWin.close();
    //window.print();
    return false;
}