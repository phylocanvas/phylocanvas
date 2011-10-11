/**
 * PhyloCanvas - A Javascript and HTML5 Canvas Phylogenetic tree drawing tool.
 * 
 * @author Chris Powell (c.powell@imperial.ac.uk)
 */

/**
 * Get the y coordinate of oElement
 * 
 * @param oElement - The element to get the Y position of.
 * 
 */
function getY( oElement )
{
 var iReturnValue = 0;
 while( oElement != null ) {
	iReturnValue += oElement.offsetTop;
	oElement = oElement.offsetParent;
 }
 return iReturnValue;
}

/**
 * Get the x coordinate of oElement
 * 
 * @param oElement - The element to get the X position of.
 * 
 */
function getX( oElement )
{
 var iReturnValue = 0;
 while( oElement != null ) {
	iReturnValue += oElement.offsetLeft;
	oElement = oElement.offsetParent;
 }
 return iReturnValue;
}

	/**
 * The PhyloCanvas library
 */	
PhyloCanvas = 
{ 
	createHandler : function(obj, func)
	{
		return (function(e){return obj[func](e);});
	},
	//Non-static members
	Angles:{
		FORTYFIVE : Math.PI / 4,
		QUARTER : Math.PI / 2,
		HALF : Math.PI,
		FULL : 2 * Math.PI
	},		
	Shapes : {
		"x" : "star",
		"s" : "square",
		"o" : "circle",
		"t" : "triangle"
	},
	/**
	 * Creates a branch
	 * 
	 * @constructor
	 * @this {PhyloCanvas.Branch}
	 * 
	 */
	Branch : function()
	{
		this.id = "";
		this.children = [];	
		this.canvas;
		
		this.data = {};
		
		this.startx = 0;
		this.starty = 0;
		this.interx = 0;
		this.intery = 0;
		this.centerx = 0;
		this.centery = 0;
		this.childNo = 0;
		this.depth = 0;
		this.leaf = true;
		this.radius =  1.0;
		this.nodeShape = "circle";
		this.selected = false;
		this.color =  "rgba(0,0,0,1)";
		
		this.parent = null;
		this.tree = {};
		this.branchLength =  0;
		this.totalBranchLength = this.branchLength;
		this.angle;
		this.label = "";
		this.collapsed = false;
		//for circular drawing
		this.minChildAngle = PhyloCanvas.Angles.FULL;
		this.maxChildAngle = 0;
		
		//events
		this.onselected = null;
	},
	ContextMenu : function(tree)
	{
	  this.tree = tree;
	},
	Loader : function(div)
	{
		this.div = div;
		this.cl = document.createElement('canvas');
		this.cl.id = div.id + 'Loader';
		this.cl.style.position = 'absolute';
		this.cl.style.backgroundColor = '#FFFFFF';
		this.cl.style.top = (div.offsetHeight/4) + "px";  
		this.cl.style.left = (div.offsetWidth/4) + "px";
		this.cl.height = div.offsetHeight/2;
		this.cl.width = div.offsetWidth/2;
		this.cl.style.zIndex = '1000';
		div.appendChild(this.cl);
		this.ctx = this.cl.getContext('2d');
		this.drawer = null;
		this.loader_radius;
		this.loader_step = (2 * Math.PI) / 360;    
  
        this.message = "Loading ...";
	},
	Navigator : function()
	{
		
	},
	Tree : function(div)
	{
		this.branches = {};
		this.leaves = [];
		this.loader = new PhyloCanvas.Loader(div);
		this.root = false;
		
		this.canvasEl = div;
		this.canvasEl.style.position = 'relative';
         var cl = document.createElement('canvas');
         cl.id = div.id + 'pCanvas';
         cl.style.position = 'relative';
         cl.style.backgroundColor = '#FFFFFF';
         cl.height = div.clientHeight;
         cl.width = div.clientWidth;
         cl.style.zIndex = '1';
         this.canvasEl.appendChild(cl);
      
         this.drawn = false;
	
		 this.selectedNodes = [];
		 
         this.zoom = 1;
         this.pickedup = false;
         this.dragging = false;
         this.startx; this.starty;
         this.pickedup = false;
         this.baseNodeSize = 1;
         this.curx;
         this.cury;
         this.origx;
         this.origy;
		 
         this.loader.run();
         this.navigator = new PhyloCanvas.Navigator(div);

         this.canvas = cl.getContext('2d');

		 //this.canvas.translate(this.canvas.canvas.width/2, this.canvas.height/2);
         this.canvas.canvas.onselectstart = function () { return false; };
         this.canvas.fillStyle = "#000000";
         this.canvas.strokeStyle = "#000000";
		 this.canvas.save();
         
         this.offsetx = this.canvas.canvas.width/2;
         this.offsety = this.canvas.canvas.height/2;
         this.selectedColor = "rgba(49,151,245,1)";
		 this.highlightColor = "rgba(49,151,245,1)";
		 this.highlightWidth = 3.0;
		 this.selectedNodeSizeIncrease = 0;
         this.branchColor = "rgba(0,0,0,1)";
         this.branchScalar = 1.0;
		 
		 this.internalNodesSelectable = true;
		 
         this.showLabels = true;
		 this.showBootstraps = false;
		 
         this.treeType = 'radial';
         this.maxBranchLength = 0;
         this.lineWidth = 1.0;
         this.textSize = 10;
		 this.font = "sans-serif";
	  
         this.minX = Number.MAX_VALUE;
         this.maxX = -1.0 * Number.MAX_VALUE;
         this.minY = Number.MAX_VALUE;
         this.maxY = -1.0* Number.MAX_VALUE;
         
		 this.unselectOnClickAway = true;
		 this.rightClickZoom = true;
		 
         this.onselected = null;
		
		 //if(this.showControls) this.drawControls();
		this.canvas.canvas.oncontextmenu = PhyloCanvas.createHandler(this, "clicked");
		this.canvas.canvas.onclick = PhyloCanvas.createHandler(this, "clicked");
		this.canvas.canvas.ondblclick =  PhyloCanvas.createHandler(this, "dblclicked");
		this.canvas.canvas.onmousedown =  PhyloCanvas.createHandler(this, "pickup");
		this.canvas.canvas.onmouseup =  PhyloCanvas.createHandler(this, "drop");
		this.canvas.canvas.onmouseout =  PhyloCanvas.createHandler(this, "drop");
		this.canvas.canvas.onmousemove =  PhyloCanvas.createHandler(this, "drag");
		this.canvas.canvas.onmousewheel = PhyloCanvas.createHandler(this, "scroll");
		this.canvas.canvas.addEventListener('DOMMouseScroll', PhyloCanvas.createHandler(this, "scroll"));
		
	}
};

//static members
PhyloCanvas.ContextMenu.prototype = {
    
};
PhyloCanvas.Loader.prototype = {
		
	           
         run : function() // ctx = Canvas 2d Context
         {
             var i = 0;
             this.cl.style.diangle = "block";
             this.initLoader();
             var loader = this;
             this.drawer = setInterval(function(){
                 loader.drawLoader(i);
                 i++;    
             }, 10);
         
         },
		 resize : function()
         {
            this.cl.style.top = "2px";  
            this.cl.style.left = "2px";
            this.cl.height = this.div.offsetHeight * .75;
            this.cl.width = this.div.offsetWidth  * .75;
            
            this.ctx.strokeStyle = 'rgba(180,180,255,1)';
            this.ctx.fillStyle = 'rgba(180,180,255,1)';
            this.ctx.lineWidth = 10.0;
             
            this.ctx.font = "24px sans-serif";
             
            this.ctx.shadowOffsetX = 2.0;
            this.ctx.shadowOffsetY = 2.0;

         },
		 initLoader : function()
         {
             this.ctx.strokeStyle = 'rgba(180,180,255,1)';
             this.ctx.fillStyle = 'rgba(180,180,255,1)';
             this.ctx.lineWidth = 10.0;
             
             this.ctx.font = "24px sans-serif";
             
             this.ctx.shadowOffsetX = 2.0;
             this.ctx.shadowOffsetY = 2.0;
         },
		 drawLoader : function (t)
         {   
             this.ctx.restore();
             
             this.ctx.translate(0,0); 
             this.loader_radius = Math.min(this.ctx.canvas.width/4, this.ctx.canvas.height/4);
            
             this.ctx.save();
             this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
            this.ctx.translate(this.ctx.canvas.width/2, this.ctx.canvas.height/2);
             
             this.ctx.beginPath();
             this.ctx.arc(0,0, this.loader_radius, this.loader_step * t, this.loader_step * t + 2);
             this.ctx.stroke();
            
             this.ctx.beginPath();
             this.ctx.arc(0,0, this.loader_radius, this.loader_step * t + 3, this.loader_step * t + 5); 
             this.ctx.stroke();
             var txt = this.message;
             this.ctx.fillText(txt, -(this.ctx.measureText(txt).width / 2), this.loader_radius + 50, this.cl.width);
             
             
         },
		 stop : function(){
            clearInterval(this.drawer);
            this.cl.style.display = "none";
         },
		 fail : function(message)
		 {
			 
			clearInterval(this.drawer);
			this.loader_radius = Math.min(this.ctx.canvas.width/4, this.ctx.canvas.height/4);
			 this.ctx.restore();
             
             this.ctx.translate(0,0); 
			 this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
            //	this.ctx.translate(this.ctx.canvas.width/2, this.ctx.canvas.height/2);
             
             this.ctx.beginPath();
			
			this.ctx.strokeStyle = 'rgba(255,180,180,1)';
            this.ctx.fillStyle = 'rgba(255,180,180,1)';
			
			this.ctx.translate(this.ctx.canvas.width/2, this.ctx.canvas.height/2);
			
			this.ctx.beginPath();
			
			this.ctx.moveTo(0,0);
			this.ctx.lineTo(this.loader_radius, this.loader_radius);
			this.ctx.moveTo(0,0);
			this.ctx.lineTo(-this.loader_radius, this.loader_radius);
			this.ctx.moveTo(0,0);
			this.ctx.lineTo(-this.loader_radius, -this.loader_radius);
			this.ctx.moveTo(0,0);
			this.ctx.lineTo(this.loader_radius, -this.loader_radius);
			this.ctx.stroke();
			
			
			this.ctx.fillText(message, -(this.ctx.measureText(message).width / 2), this.loader_radius + 50, this.loader_radius * 2);
		 }
};
PhyloCanvas.Navigator.prototype = {};
PhyloCanvas.Branch.prototype = {
	/*
	 * @function addChild 
	 * @description add a child branch to this branch
	 */
	addChild : function(node)
	{
		node.parent = this;
		node.childNo = this.children.length;
		node.depth = this.depth + 1;
		node.canvas = this.canvas;
		node.tree = this.tree;
		this.children.push(node);
	},
	clicked : function(x,y)
	{
		if(x < (this.maxx ) && x > (this.minx ))
		{
			if(y < (this.maxy ) && y > (this.miny ))
			{
				return this;	
			}
		}
		for(var i = this.children.length - 1; i >= 0; i--)
		{
			cld = this.children[i].clicked(x,y);			
			if(cld) return cld;
		}
		return false;
	},
	drawLabel : function()
	{
	   // var  h = (/this.tree.zoom) ;
	    try{
		this.canvas.font = Math.max(Math.round(this.tree.textSize/this.tree.zoom), 4) + "pt " + this.tree.font;

		var lbl = this.id;
		
		var dim = this.canvas.measureText(lbl);
		var tx = this.centerx + (dim.width *(0.5 * Math.cos(this.angle) - 0.5 )) + ((5 + this.radius * 2)* Math.cos(this.angle));
		var ty = this.centery +(this.tree.textSize * (0.5 * Math.sin(this.angle)) + 0.5) +  ((5 + this.radius * 2)* Math.sin(this.angle));
		this.canvas.beginPath();
		this.canvas.fillStyle = (this.selected)?  this.tree.selectedColor : this.tree.branchColor;
		this.canvas.fillText(lbl, tx ,ty);
		this.canvas.closePath();
		}catch(e){alert(e);}
	},
	drawNode : function()
	{
		var  r = (this.radius * this.tree.baseNodeSize); //r = node radius
		var theta = this.radius * this.tree.baseNodeSize; //theta = translation to center of node... ensures that the node edge is at the end of the branch so the branches don't look shorter than  they should
		
		 var cx = this.leaf ? (theta * Math.cos(this.angle)) + this.centerx : this.centerx;
		 var cy = this.leaf ? (theta * Math.sin(this.angle)) + this.centery : this.centery;
		
		this.canvas.beginPath();
		this.canvas.fillStyle = this.selected ? this.tree.selectedColor:this.color ;
		if((r * this.tree.zoom) < 5)
		{
		   var e =  (5 / this.tree.zoom);
		   this.minx = cx - e;
		   this.maxx = cx + e;
		   this.miny = cy - e;
		   this.maxy = cy + e;
		}
		else
		{
		   this.minx =  cx - r;
		   this.maxx = cx + r;
		   this.miny= cy - r;
		   this.maxy = cy + r;
		}
		if(this.collapsed)
		{
			var x1 = this.radius * 5 * Math.cos(this.angle - PhyloCanvas.Angles.QUARTER);
			var y1 = this.radius * 5 * Math.sin(this.angle - PhyloCanvas.Angles.QUARTER);
			var x2 = this.radius * 5 * Math.cos(this.angle);
			var y2 = this.radius * 5 * Math.sin(this.angle);
			this.canvas.beginPath();
			this.canvas.moveTo((this.centerx - x1), (this.centery - y1));
			this.canvas.lineTo((this.centerx + x1), (this.centery + y1));
			this.canvas.lineTo((this.centerx + x2), (this.centery + y2));
			this.canvas.lineTo((this.centerx - x1), (this.centery - y1));
			this.canvas.closePath();
			this.canvas.fill();
			
		}
		else if(this.leaf)
		{
			this.canvas.save();
			this.canvas.translate(this.centerx, this.centery);
			this.canvas.rotate(this.angle);
			this.tree.nodeRenderers[this.nodeShape](this);
			this.canvas.restore();
			if(this.tree.showLabels) this.drawLabel();
		}
	
		this.canvas.closePath();
		
		
		 if(this.highlighted)
		 {
			 this.canvas.beginPath();
			 var l = this.canvas.lineWidth;
			 this.canvas.strokeStyle = this.tree.highlightColor;
			 this.canvas.lineWidth = this.tree.highlightWidth / this.tree.zoom;
			 this.canvas.arc(cx, cy, (this.leaf? this.radius * this.tree.baseNodeSize : 0)+ ((5 + ( this.tree.highlightWidth/ 2)) / this.tree.zoom), 0, PhyloCanvas.Angles.FULL, false);
			 this.canvas.stroke();
			 this.canvas.lineWidth = l;
			 this.canvas.strokeStyle = this.tree.branchColor;
			 this.canvas.beginPath();
		 }
	},
	getChildIds : function()
	{
		if(this.leaf)
		{
			return this.id;
		}
		else
		{
			var children = [];
			for(var x = 0; x < this.children.length; x++)
			{
				children.push(this.children[x].getChildIds());
			}
			return children.join(",");
		}
	},
	getChildCount : function()
	{
		if(this.leaf) return 1;
		var children = 0;
		for(var x = 0; x < this.children.length; x++)
		{
			children += this.children[x].getChildCount();
		}
		return children;
	},
	getChildYTotal : function()
	{
	 if(this.leaf) return this.centery;
	 
	 var y = 0;
	 for(var i = 0; i < this.children.length; i++)
	 {
		y += this.children[i].getChildYTotal();
	 }
	 return y;
	},
	setSelected : function(selected, applyToChildren)
	{
		var ids = this.id;
		this.selected = selected;
		if(applyToChildren){
			for(var i = 0; i < this.children.length; i++)
			{
			  ids = ids + "," + this.children[i].setSelected(selected, applyToChildren);
			}
		}
		return ids;
	},
	setHighlighted : function(highlighted)
	{
		//var ids = this.id;
		this.highlighted = highlighted;
		if(!highlighted){
			for(var i = 0; i < this.children.length; i++)
			{
			  this.children[i].setHighlighted(highlighted);
			}
		}
		//return ids;
	},
	reset : function()
	{
		this.startx = 0;
		this.starty = 0;
		this.centerx = 0;
		this.centery = 0;
		this.angle = null;
		//this.totalBranchLength = 0;
		this.minChildAngle = PhyloCanvas.Angles.FULL;
		this.maxChildAngle = 0;
		for(cld in this.children)
		{
			try{
				this.children[cld].pcReset();
			}catch(e){}
		}
	},
	parseNwk :function(nwk, idx)
	{
		idx = this.parseLabel(nwk,idx);
		if(nwk[idx] == ":")
		{
			idx = this.parseNodeLength(nwk, idx + 1);
		}
		else
		{
			this.branchLength = 0;
		}
		if(!this.id || this.id == "") this.id = this.tree.genId();
		return idx;
	},
	parseLabel : function(nwk, idx)
	{	 
		var lbl = "";
		for(idx; nwk[idx] != ":" && nwk[idx] != "," && nwk[idx] != ")" && idx < nwk.length; idx++)
		{
		   lbl += nwk[idx];
		}
		//idx--;
		if(!lbl) return idx;
		if(lbl.match(/\*/))
		{
			var bits = lbl.split("**");
			this.id = bits[0];
			if(bits.length == 1 ) return idx;
			// if(pcdebug && Ext) Ext.get(pcdebug).update(pcdebug.innerText + '\nNode Colour is : ' + bits[b+1]); && Ext) Ext.get(pcdebug).update(pcdebug.innerHtml + '<br />label is : ' + bits[0]);
			bits = bits[1].split("*");
		
			for(var b = 0; b < bits.length; b += 2)
			{
			   switch (bits[b])
			   {
				  case "nsz" :
					  // if(pcdebug && Ext) Ext.get(pcdebug).update(pcdebug.innerText + '\nNode Colour is : ' + bits[b+1]); && Ext) Ext.get(pcdebug).update(pcdebug.innerHtml + '<br />Node Size is : ' + bits[b+1]);
					 this.radius = parseInt(bits[b+1]);
					 break;
				  case "nsh" : 
				  
					if(PhyloCanvas.Shapes[bits[b+1]]) this.nodeShape = PhyloCanvas.Shapes[bits[b+1]];
					else if(this.nodeRenderers[bits[b+1]]) this.nodeShape = bits[b+1];
					else this.nodeShape = "circle";
					 // if(pcdebug && Ext) Ext.get(pcdebug).update(pcdebug.innerText + '\nNode Colour is : ' + bits[b+1]); && Ext) Ext.get(pcdebug).update(pcdebug.innerHtml + '<br />Node shape is : ' + bits[b+1]);
					 break;
				  case "ncol" : this.color = bits[b+1];
					 var hexRed = '0x' + this.color.substring(0,2);
					 var hexGreen = '0x' + this.color.substring(2,4);
					 var hexBlue = '0x' + this.color.substring(4,6);
					 this.color = 'rgba('+parseInt(hexRed, 16).toString()+','+parseInt(hexGreen, 16).toString()+','+parseInt(hexBlue, 16).toString()+',1)';
					 // if(pcdebug && Ext) Ext.get(pcdebug).update(pcdebug.innerText + '\nNode Colour is : ' + bits[b+1]); && Ext) Ext.get(pcdebug).update(pcdebug.innerHtml + '<br />Node Colour is : ' + bits[b+1]);
					 break;
			   }
			}
		}
		else
		{
			this.id = lbl;				
		}	
		return idx;
	},
	parseNodeLength : function(nwk, idx)
	{
		var str = "";
		for(idx; nwk[idx] != ")" && nwk[idx] != ","; idx++)
		{
		   str += nwk[idx];
		}
		 
		this.branchLength = parseFloat(str);
		if(this.branchLength < 0) this.branchLength = 0;
		return idx;
	},
	collapse : function()
   {
	   this.collapsed = this.leaf === false; // don't collapse the node if it is a leaf... that would be silly!
   },
   expand : function()
   {
	   this.collapsed = false;
   },
   toggleCollapsed : function()
   {
	   this.collapsed ? this.expand() : this.collapse();
   },
	setTotalLength : function()
	{
		if(this.parent)
		{
			this.totalBranchLength = this.parent.totalBranchLength +  this.branchLength;
			if(this.totalBranchLength > this.tree.maxBranchLength) this.tree.maxBranchLength = this.totalBranchLength;
		}
		else
		{
		 this.totalBranchLength = this.branchLength;
		 if(this.totalBranchLength > this.tree.maxBranchLength) this.tree.maxBranchLength = this.totalBranchLength;
		}
		for(var c = 0; c < this.children.length ; c++)
		{
			this.children[c].setTotalLength();
		}
	}
};
PhyloCanvas.Tree.prototype = {
	draw : function()
	{
		this.selectedNodes = [];
		 
		this.canvas.restore();
		
		
		this.canvas.clearRect(0,0,this.canvas.canvas.width,this.canvas.canvas.height);
		this.canvas.lineCap = "round";
		this.canvas.lineJoin = "round";
		
		this.canvas.strokeStyle = this.branchColor;
		this.canvas.save();
		
		this.canvas.translate(this.canvas.canvas.width /2,this.canvas.canvas.height / 2);
		
		if(!this.drawn)
		{
			this.prerenderers[this.treeType](this);
		}
		this.canvas.translate(this.offsetx, this.offsety);
		this.canvas.scale(this.zoom, this.zoom);
		this.canvas.lineWidth = this.lineWidth / this.zoom;
		
		this.branchRenderers[this.treeType](this, this.root);
		
		for(var i = 0; i < this.selectedNodes.length; i++)
		{
			this.branchRenderers[this.treeType](this, this.selectedNodes[i]);
		}
		this.drawn = true;
		this.loader.stop();
	},
	genId : function()
	{
		var id = "pcn0";
		for(var i = 1; this.branches[id] ;i++)
		{
			id = "pcn" + i;
		}
		return id;
	},
	nodeRenderers : {
		circle : function (node) {
			var r = node.radius * node.tree.baseNodeSize;
			node.canvas.arc(r, 0, r, 0, PhyloCanvas.Angles.FULL, false);
			node.canvas.stroke();
			node.canvas.fill();
		},
		square : function (node) 
		{ 
			var r = node.radius * node.tree.baseNodeSize;
			var x1 = 0;
			var x2 = r * 2;
			var y1 = -r;
			var y2 = r ;
			node.canvas.moveTo(x1, y1);
			node.canvas.lineTo(x1, y2);
			node.canvas.lineTo(x2, y2);
			node.canvas.lineTo(x2, y1);
			node.canvas.lineTo(x1, y1);
			node.canvas.stroke();
			node.canvas.fill();
		},
		star: function (node) 
		{
			var r = node.radius * node.tree.baseNodeSize;
			var cx =  r ;
			var cy = 0; 
			
			node.canvas.moveTo(cx, cy);
			var alpha = (2 * Math.PI) / 10;
			var rb = r * 1.75;
			for(var i = 11; i != 0; i--)
			{
				var ra = i % 2 == 1 ? rb: r;
				var omega = alpha * i;
				node.canvas.lineTo(cx + (ra * Math.sin(omega)), cy + (ra * Math.cos(omega)));
			}
			node.canvas.stroke();
			node.canvas.fill();
		},
		triangle : function (node) 
		{
			var r = node.radius * node.tree.baseNodeSize;
			var cx = r;
			var cy = 0; 
			var x1 = cx - r;
			var x2 = cx + r;
			var y1 = cy - r;
			var y2 = cy + r;
			node.canvas.moveTo(cx, y1);
			node.canvas.lineTo(x2, y2);
			node.canvas.lineTo(x1, y2);
			node.canvas.lineTo(cx, y1);
			node.canvas.stroke();
			node.canvas.fill();
		}
	},
	prerenderers : 
	{
		rectangular : function(tree)
		{
			tree.root.startx = 0;
			tree.root.starty = 0;
			tree.root.centerx = 0;
			tree.root.centery = 0;
			tree.branchScalar = tree.canvas.canvas.width / tree.maxBranchLength;
			var ystep = Math.max(tree.canvas.canvas.height / (tree.leaves.length + 2), (tree.leaves[0].radius + 2) * 2);
			for(var i = 0; i < tree.leaves.length; i++)
			{
				tree.leaves[i].angle = 0;
				tree.leaves[i].centery = (i > 0 ? tree.leaves[i-1].centery  + ystep : 0);
				tree.leaves[i].centerx = tree.leaves[i].totalBranchLength * tree.branchScalar;
				
				for(var nd = tree.leaves[i]; nd.parent; nd = nd.parent)
				{
					if(nd.childNo == 0)
					{
						nd.parent.centery = nd.centery;
					}
					if(nd.childNo == nd.parent.children.length - 1)
					{
						nd.parent.centery = (nd.parent.centery + nd.centery )/2; // (nd.parent.children.length - 1);
					}
					else
					{
						break;
					}
				}
			}
			
			var miny = tree.leaves[0].centery - tree.leaves[0].radius;
			var maxy = tree.leaves[tree.leaves.length - 1].centery + tree.leaves[tree.leaves.length - 1].radius;
			
			var minx = 0;
			var maxx = (tree.maxBranchLength * tree.branchScalar) + (tree.leaves[0].radius * 2);
			
			tree.root.startx = tree.root.centerx;
			tree.root.starty = tree.root.centery;
			tree.zoom = Math.min((tree.canvas.canvas.width -100) / (maxx), (tree.canvas.canvas.height - 100) / (maxy - miny));
			//tree.offsetx = tree.canvas.canvas.width/2 - (maxx - minx) /2;
			//tree.offsety = miny + 20;
			tree.offsetx =  - ((maxx - minx)*tree.zoom /2) ;
			tree.offsety = - ((maxy - miny)*tree.zoom /2) ;
			
			//tree.zoom = Math.min((tree.canvas.canvas.width - 20) / (maxx - minx), (tree.canvas.canvas.height - 20) / (maxy - miny));
		}, 
		circular : function(tree)
		{
			tree.root.startx = 0;
			tree.root.starty = 0;
			tree.root.centerx = 0;
			tree.root.centery = 0;
			tree.branchScalar = Math.min(tree.canvas.canvas.width, tree.canvas.canvas.height)/tree.maxBranchLength;
			// work out radius of tree and the make branch scalar proportinal to the 
			var r = (tree.leaves.length * tree.leaves[0].radius * 2)/PhyloCanvas.Angles.FULL;
			if(tree.branchScalar * tree.maxBranchLength > r)
			{
				r = tree.branchScalar * tree.maxBranchLength;
			}
			else
			{
				tree.branchScalar = r / tree.maxBranchLength;
			}
			
			var step = PhyloCanvas.Angles.FULL / tree.leaves.length;
			
			for(var i = 0; i < tree.leaves.length; i++)
			{
				tree.leaves[i].angle = step * i;
				tree.leaves[i].centery = r * Math.sin(tree.leaves[i].angle);
				tree.leaves[i].centerx = r * Math.cos(tree.leaves[i].angle);
				tree.leaves[i].starty = ((tree.leaves[i].parent.totalBranchLength * tree.branchScalar)) * Math.sin(tree.leaves[i].angle);
				tree.leaves[i].startx = ((tree.leaves[i].parent.totalBranchLength * tree.branchScalar)) * Math.cos(tree.leaves[i].angle);
				tree.leaves[i].intery = ((tree.leaves[i].totalBranchLength * tree.branchScalar)) * Math.sin(tree.leaves[i].angle);
				tree.leaves[i].interx = ((tree.leaves[i].totalBranchLength * tree.branchScalar)) * Math.cos(tree.leaves[i].angle);
				for(var nd = tree.leaves[i]; nd.parent; nd = nd.parent)
				{
					if(nd.childNo == 0)
					{
						nd.parent.angle = nd.angle;
						nd.parent.minChildAngle = nd.angle;
					}
					if(nd.childNo == nd.parent.children.length - 1)
					{
						nd.parent.maxChildAngle = nd.angle;
						nd.parent.angle = (nd.parent.minChildAngle + nd.parent.maxChildAngle) / 2;
						nd.parent.centery = (nd.parent.totalBranchLength * tree.branchScalar) * Math.sin(nd.parent.angle);
						nd.parent.centerx = (nd.parent.totalBranchLength * tree.branchScalar) * Math.cos(nd.parent.angle);
						nd.parent.starty = ((nd.parent.totalBranchLength - nd.parent.branchLength) * tree.branchScalar) * Math.sin(nd.parent.angle);
						nd.parent.startx = ((nd.parent.totalBranchLength - nd.parent.branchLength) * tree.branchScalar) * Math.cos(nd.parent.angle);
					}
					else
					{
						break;
					}
				
				}
			}
			tree.offsetx = 0;
			tree.offsety = 0;
			
			tree.zoom = (Math.min(tree.canvas.canvas.width, tree.canvas.canvas.height) - 50  - tree.leaves[0].radius) / (r * 2);
		},
		radial : function(tree)
		{
			tree.branchScalar = Math.min(tree.canvas.canvas.width, tree.canvas.canvas.height) / tree.maxBranchLength;
			//tree.root.setTotalLength();
			
			var step = PhyloCanvas.Angles.FULL / tree.leaves.length;
			tree.root.startx = 0;
			tree.root.starty = 0;
			tree.root.centerx = 0;
			tree.root.centery = 0;
			
			for(var i = 0.0; i < tree.leaves.length; i += 1.0)
			{
				tree.leaves[i].angle = step * i;
				tree.leaves[i].centerx = tree.leaves[i].totalBranchLength * tree.branchScalar * Math.cos(tree.leaves[i].angle);
				tree.leaves[i].centery = tree.leaves[i].totalBranchLength * tree.branchScalar * Math.sin(tree.leaves[i].angle);
	
				for(var nd = tree.leaves[i]; nd.parent; nd = nd.parent)
				{
					if(nd.childNo == 0)
					{	
						nd.parent.angle = 0;
					}
					nd.parent.angle += (nd.angle * nd.getChildCount());
					if(nd.childNo == nd.parent.children.length - 1)
					{
						nd.parent.angle = nd.parent.angle / nd.parent.getChildCount();
					}
					else
					{
						break;
					}
				}
			}
			
			tree.minx = Number.MAX_VALUE;
			tree.maxx = -Number.MAX_VALUE;
			tree.miny = Number.MAX_VALUE;
			tree.maxy = -Number.MAX_VALUE;
			
			tree.nodePrerenderers.radial(tree, tree.root);
					
			var sx = (tree.maxx - tree.minx);
			var sy = (tree.maxy - tree.miny);
			
			tree.zoom = Math.min((tree.canvas.canvas.width - 50) / sx, (tree.canvas.canvas.height - 50) / sy);
			tree.offsetx =  - ((tree.minx + tree.maxx)/2) * tree.zoom;
			tree.offsety =  - ((tree.miny + tree.maxy)/2) * tree.zoom;
			
		},
		diagonal : function(tree)
		{
			var ystep = Math.max(tree.canvas.canvas.height / (tree.leaves.length + 2), (tree.leaves[0].radius + 2) * 2); 
			for(var i = 0; i < tree.leaves.length; i++)
			{
				tree.leaves[i].centerx = 0;
				tree.leaves[i].centery = (i > 0 ? tree.leaves[i-1].centery + ystep : 0);
				tree.leaves[i].angle = 0;
				
				for(var nd = tree.leaves[i]; nd.parent; nd = nd.parent)
				{
					if(nd.childNo == nd.parent.children.length - 1)
					{
						nd.parent.centery = nd.parent.getChildYTotal() / nd.parent.getChildCount(); // (nd.parent.children.length - 1);
						nd.parent.centerx = nd.parent.children[0].centerx + ((nd.parent.children[0].centery - nd.parent.centery) * Math.tan(PhyloCanvas.Angles.FORTYFIVE));
						for(var j = 0; j < nd.parent.children.length; j++)
						{
							nd.parent.children[j].startx = nd.parent.centerx;
							nd.parent.children[j].starty = nd.parent.centery;
						}
					}
					else
					{
						break;
					}
				}
			}
			
			var miny = tree.leaves[0].centery - tree.leaves[0].radius;
			var maxy = tree.leaves[tree.leaves.length - 1].centery + tree.leaves[tree.leaves.length - 1].radius;
		
			var minx = 0;
			var maxx = tree.maxBranchLength + (tree.leaves[0].radius * 2);
		
			tree.root.startx = tree.root.centerx;
			tree.root.starty = tree.root.centery;
			
			tree.offsetx = - (maxx - minx) /2;
			tree.offsety = -maxy/2;
			
			tree.zoom = Math.min((tree.canvas.canvas.width -20) / (maxx - minx), (tree.canvas.canvas.height -20) / (maxy - miny));
			
		},
		hierarchy : function(tree)
		{
			tree.root.startx = 0;
			tree.root.starty = 0;
			tree.root.centerx = 0;
			tree.root.centery = 0;
			tree.branchScalar = tree.canvas.canvas.height/tree.maxBranchLength;
			var xstep = Math.max(tree.canvas.canvas.width / (tree.leaves.length + 2), (tree.leaves[0].radius +2) * 2);
				
			for(var i = 0; i < tree.leaves.length; i++)
			{
				tree.leaves[i].angle = PhyloCanvas.Angles.QUARTER;
				tree.leaves[i].centerx = (i > 0 ?tree.leaves[i-1].centerx + xstep : 0);
				tree.leaves[i].centery = tree.leaves[i].totalBranchLength * tree.branchScalar;
				
				for(var nd = tree.leaves[i]; nd.parent; nd = nd.parent)
				{
					if(nd.childNo == 0)
					{
						nd.parent.centerx = nd.centerx;
					}
					
					if(nd.childNo == nd.parent.children.length - 1)
					{
						nd.parent.angle = PhyloCanvas.Angles.QUARTER;
						nd.parent.centerx = (nd.parent.centerx + nd.centerx )/2;
						nd.parent.centery = nd.parent.totalBranchLength * tree.branchScalar;
						for(var j = 0; j < nd.parent.children.length; j++)
						{
							nd.parent.children[j].startx = nd.parent.centerx;
							nd.parent.children[j].starty = nd.parent.centery;
						}
						
					}
					else
					{
						break;
					}
				}
			}
			var minx = tree.leaves[0].centerx - tree.leaves[0].radius;
			var maxx = tree.leaves[tree.leaves.length - 1].centerx + tree.leaves[tree.leaves.length - 1].radius;
			
			var miny = 0;
			var maxy = (tree.maxBranchLength * tree.branchScalar) + (tree.leaves[0].radius * 2);
			tree.zoom = Math.min((tree.canvas.canvas.width -50) / (maxx - minx), (tree.canvas.canvas.height -50) / (maxy - miny));
			tree.root.startx = tree.root.centerx;
			tree.root.starty = tree.root.centery;
			
			tree.offsety = - ((maxy - miny)*tree.zoom /2) ;
			tree.offsetx = - ((maxx - minx)*tree.zoom /2) ;
			
			
		}
	},
	nodePrerenderers : 
	{
		radial : function(tree, node)
		{
			if(node.parent)
			{
				node.startx = node.parent.centerx;
				node.starty = node.parent.centery;
			}
			else
			{
				node.startx = 0;
				node.starty = 0;
			}
			node.centerx = node.startx + (node.branchLength * tree.branchScalar * Math.cos(node.angle));
			node.centery = node.starty + (node.branchLength * tree.branchScalar * Math.sin(node.angle));
			
			tree.minx = Math.min(node.centerx, tree.minx);
			tree.maxx = Math.max(node.centerx, tree.maxx);
			tree.miny = Math.min(node.centery, tree.miny);
			tree.maxy = Math.max(node.centery, tree.maxy);
			
			
			for(var i = 0; i < node.children.length; i++)
			{
				this.radial(tree, node.children[i]);
			}
		}
	},
	branchRenderers : 
	{
		rectangular : function (tree, node, collapse){
			var  bl = node.branchLength * tree.branchScalar ;
			node.angle = 0;
			if(node.parent){
				node.centerx = node.startx +  bl;
			}
			if(node.selected)
			{
				node.canvas.strokeStyle = tree.selectedColor;//this.parent && this.parent.selected ? this.tree.selectedColor : this.tree.branchColor;
				node.canvas.fillStyle = tree.selectedColor;
			}
			else
			{
				node.canvas.strokeStyle = tree.branchColor;
				node.canvas.fillStyle = node.color;
			}
			
			node.canvas.beginPath();
			
			if(!collapse){
				node.canvas.moveTo(node.startx , node.starty);
				node.canvas.lineTo(node.startx, node.centery);
				node.canvas.lineTo(node.centerx, node.centery);
				node.canvas.stroke();
				node.canvas.closePath();
				node.drawNode();
			}
			
			node.canvas.closePath();
			
			for(var i = 0 ; i < node.children.length ;i++)
			{
				node.children[i].startx = node.centerx;
				node.children[i].starty = node.centery;
				if(node.children[i].selected && !collapse)
				{
				 tree.selectedNodes.push(node.children[i]);
				}
				else
				{
				  tree.branchRenderers.rectangular(tree, node.children[i], node.collapsed || collapse);
				}
			}
		},
		circular : function(tree, node, collapse){
			var  bl = node.totalBranchLength * tree.branchScalar;

			if(node.selected){
				node.canvas.strokeStyle = node.tree.selectedColor;//this.parent && this.parent.selected ? this.tree.selectedColor : this.tree.branchColor;
				node.canvas.fillStyle = node.tree.selectedColor;
			}
			else
			{
				node.canvas.strokeStyle = node.tree.branchColor;
				node.canvas.fillStyle = node.color;
			}
			
			if(!collapse){
				node.canvas.beginPath();
				node.canvas.moveTo(node.startx, node.starty);
				if(node.leaf)
				{
					node.canvas.lineTo(node.interx, node.intery);
					node.canvas.stroke();
					var ss = node.canvas.strokeStyle;
					node.canvas.strokeStyle = node.selected ? node.tree.selectedColor :  "rgba(0,0,0,0.5)";
					node.canvas.lineTo(node.centerx, node.centery);
					node.canvas.stroke();
					node.canvas.strokeStyle = ss;
				}
				else
				{
					node.canvas.lineTo(node.centerx, node.centery);
					node.canvas.stroke();
				}
				
				if(node.selected)
				{
					node.canvas.strokeStyle = node.tree.selectedColor;
				}
				else
				{
					node.canvas.strokeStyle = node.tree.branchColor;
				}
				
				if(node.children.length > 1 && !node.collapsed )
				{
					node.canvas.beginPath();
					node.canvas.arc(0, 0, (bl) , node.minChildAngle, node.maxChildAngle,node.maxChildAngle < node.minChildAngle);
					node.canvas.stroke();
					node.canvas.closePath();
				}
				node.drawNode();
			}
			
			for(var i = 0 ; i < node.children.length; i++)
			{
				tree.branchRenderers.circular(tree, node.children[i], node.collapsed || collapse);
			}
		},
		radial : function(tree, node, collapse){
			if(node.selected){
				node.canvas.strokeStyle =  node.tree.selectedColor;//node.parent && node.parent.selected ? node.tree.selectedColor : node.tree.branchColor;
				node.canvas.fillStyle = node.tree.selectedColor;
			}
			else
			{
				node.canvas.strokeStyle = node.tree.branchColor;
				node.canvas.fillStyle = node.color;
			}
			if(node.parent && !collapse){
				
				node.canvas.beginPath();
				node.canvas.moveTo(node.startx , node.starty );
				node.canvas.lineTo(node.centerx ,  node.centery);
				node.canvas.stroke();
				node.canvas.closePath();
				node.drawNode();
			}
			for(var i = 0 ; i < node.children.length; i++)
			{
				if(node.children[i].selected && !collapse)
				{
				  node.tree.selectedNodes.push(node.children[i]);
				}
				else
				{
				  tree.branchRenderers.radial(tree, node.children[i], node.collapsed || collapse);
				}
			}
		},
		diagonal: function(tree, node, collapse){
			node.angle = 0;
			if(node.selected)
			{
				node.canvas.strokeStyle = node.tree.selectedColor;//node.parent && node.parent.selected ? node.tree.selectedColor : node.tree.branchColor;
				node.canvas.fillStyle = node.tree.selectedColor;
			}
			else
			{
				node.canvas.strokeStyle = node.tree.branchColor;
				node.canvas.fillStyle = node.color;
			}
			
			node.canvas.beginPath();
			//alert(node.starty);
			
			if(!collapse){
				node.canvas.moveTo(node.startx , node.starty);
				node.canvas.lineTo(node.centerx, node.centery);
				node.canvas.stroke();
				node.canvas.closePath();
				node.drawNode();
			}

			node.canvas.closePath();
			
			for(var i = 0 ; i < node.children.length ;i++)
			{
				node.children[i].startx = node.centerx;
				node.children[i].starty = node.centery;
				if(node.children[i].selected && !collapse)
				{
				  node.tree.selectedNodes.push(node.children[i]);
				}
				else
				{
				  tree.branchRenderers.diagonal(tree, node.children[i], node.collapsed || collapse);
				}
			}
		},
		hierarchy : function(tree,node,collapse) {
			if(node.selected)
			{
				node.canvas.strokeStyle = node.tree.selectedColor;//node.parent && node.parent.selected ? node.tree.selectedColor : node.tree.branchColor;
				node.canvas.fillStyle = node.tree.selectedColor;
			}
			else
			{
				node.canvas.strokeStyle = node.tree.branchColor;
				node.canvas.fillStyle = node.color;
			}
			
			
			//alert(node.starty);
			
			if(!collapse){
				node.canvas.beginPath();
				node.canvas.moveTo(node.startx , node.starty);
				node.canvas.lineTo(node.centerx, node.starty);
				node.canvas.lineTo(node.centerx, node.centery);
				node.canvas.stroke();
				
				node.drawNode();
			}
			node.canvas.closePath();
			
			for(var i = 0 ; i < node.children.length ;i++)
			{
				if(node.children[i].selected && !collapse)
				{
				  node.tree.selectedNodes.push(node.children[i]);
				}
				else
				{
				  tree.branchRenderers.hierarchy(tree, node.children[i], node.collapsed || collapse);
				}
			}
		}
	},
	setZoom : function(z)
	{
		if(z > -2 && z < 2){
			var oz = this.zoom;
			this.zoom = Math.pow(10, z);
			
			this.offsetx = (this.offsetx/oz) * this.zoom ;
			this.offsety = (this.offsety / oz) * this.zoom;
			
			this.draw();
		}
	},
	getPngUrl : function()
	{
		return this.canvas.canvas.toDataURL();		
	},
	load : function(tree, name, format)
	{
		if(format)
		{
			if(format.match(/nexus/i))
			{
				if(tree.match(/\.\w+$/)){this.AJAX(tree, 'GET', '', loadFileCallback, {format:'nexus', name:name});}
				else{this.parseNexus(tree, name);}
			}
			else if(format.match(/newick/i))
			{
				if(tree.match(/\.\w+$/)){this.AJAX(tree, 'GET', '', loadFileCallback, {format:'newick'});}
				else{this.parseNwk(tree, name);}
			}
		}
		else
		{
			if(tree.match(/\.n(ex|xs)$/))
			{
				this.AJAX(tree, 'GET', '', loadFileCallback, {format:'nexus', name:name});
			}
			else if(tree.match(/\.nwk$/))
			{
				this.AJAX(tree, 'GET', '', loadFileCallback, {format:'newick'});
			}
			else if(tree.match(/^#NEXUS[\s\n;\w\.\*\:(\),-=\[\]\/&]+$/i))
			{
				this.parseNexus(tree, name);
			}
			else if(tree.match(/^[\w\.\*\:(\),-\/]+;$/gi))
			{
				this.parseNwk(tree, name);
			}
		}
	},
	AJAX : function(url, method, params, callback, callbackPars, errorCallback)
	{
	  var xmlhttp;
	  if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	  }
	  else
	  {// code for IE6, IE5
	    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  
	  xmlhttp.onreadystatechange=function()
	  {
		if (xmlhttp.readyState==4)
		{
			if(xmlhttp.status==200)
			{
				callback(xmlhttp, callbackPars);
			}
			else
			{
				if(errorCallback) errorCallback(xmlhttp, callbackPars);
			}
		}
	  };
	  xmlhttp.open(method,url,true);
	  if(method == "GET")
	  {
		xmlhttp.send();
	  }
	  else
	  {
		xmlhttp.send(params);
	  }
	},
	loadFileCallback : function(response, opts)
	{
		if(opts.format.match(/nexus/i))
		{
			this.parseNexus(reponse.responseText, opts.name);
		}
		else if(opts.format.match(/newick/i))
		{
			this.parseNwk(response.responseText);
		}
		else
		{
			throw "file type not recognised by PhyloCanvas";
		}
		this.draw();
	},
	parseNexus : function(str, name)
	{
		if(!str.match(/^#NEXUS[\s\n;\w\.\*\/\:(\),-=\[\]&]+$/i))
		{
			 throw "the string provided was not a nexus string";
		}
		else if(!str.match(/BEGIN TREES/gi))
		{
			throw "The nexus file does not contain a tree block";
		}
			
		//Get everything between BEGIN TREES and next END;
		var treeSection = str.match(/BEGIN TREES;[\S\s]+END;/i)[0].replace(/BEGIN TREES;\n/i,'').replace(/END;/i,'');
		//get translate section
		var translateSection = treeSection.match(/TRANSLATE[^;]+;/i)[0];
		
		//remove translate section from tree section
		treeSection = treeSection.replace(translateSection, '');
		//parse translate section into kv pairs
		translateSection = translateSection.replace(/translate|;/gi, '');
		
		var tIntArr = translateSection.split(',');
		var rObj = {};
		var ia;
		for(var i = 0; i < tIntArr.length; i++)
		{
			ia = tIntArr[i].replace('\n', '').split(" ");
			rObj[ia[0].trim()] = ia[1].trim();
		}
		
		//find each line starting with tree.
		var tArr = treeSection.split('\n');
		var trees = {};		
		//id name is '' or does not exist, ask user to choose which tree.
		for(var i = 0; i < tArr.length; i++)
		{
			if(tArr[i].trim() == "") continue;
			var str = tArr[i].replace(/tree\s/i,'');
			trees[str.match(/^\w+/)[0]] = str.match(/ [\S]*$/)[0];
		}
		if(!trees[name]) throw "tree " + name + " does not exist in this NEXUS file";
		//parseNwk
		//alert(trees[name]);
		this.parseNwk(trees[name].trim());
		//translate in accordance with translate block
		for(var n in rObj)
		{
			var b = this.branches[n];
			delete this.branches[n];
			b.id = rObj[n];
			this.branches[b.id] = b;
		}
	},
	parseNwk : function(nwk)
	{		
		if(!nwk.match(/^[\w\.\*\:(\),-\/]+;$/gi)) throw "String is not a valid nwk";
		//alert(nwk);
	  if(!this.loader.drawer)this.loader.run();
		this.loader.resize();
		this.root = false;
		this.leaves = [];
		this.branches = {};
		this.drawn = false;
		var curNode = new PhyloCanvas.Branch();
		curNode.id = "root";
		this.branches.root = curNode;
		this.setRoot(curNode);
		
		for(var i = 0; i < nwk.length; i++)
		{
			switch(nwk[i])
			{
			  case '(': //new Child
			   
				var nd = new PhyloCanvas.Branch();
				//nd.id = this.genId();
				curNode.leaf = false;
				curNode.addChild(nd);
			    this.branches[curNode.id] = curNode;
				curNode = nd;
				break;
			  case ')': //return to parent
				  this.saveNode(curNode);
				 if(curNode.leaf) this.leaves.push(curNode);
				 curNode = curNode.parent;
				 break;
			  case ',': //new sibiling
				 var nd = new PhyloCanvas.Branch();
				// nd.id = this.genId();
				 if(curNode.leaf) this.leaves.push(curNode);
				  this.saveNode(curNode);
				 curNode.parent.addChild(nd);
				 curNode = nd;
				 break;
			  case ';':
				// this.root.setTotalLength();
				this.saveNode(curNode);
				 for (var l = 0; l < this.leaves.length; l++)
				{
					if(this.leaves[l].totalBranchLength > this.maxBranchLength)
					{
						this.maxBranchLength = this.leaves[l].totalBranchLength;
					}
				}
				 break;
			  default:
				 	try
				 	{
						i = curNode.parseNwk(nwk, i);
						i--;
					}
					catch(e)
					{
						alert( "Error parsing nwk file" + e );
						return;
					}
				 break;
		   }
		}
				
		
		this.root.branchLength = 0;
		this.maxBranchLength = 0;
		this.root.setTotalLength();
		
		if(this.maxBranchLength == 0)
		{
			for(var x in this.branches)
			{
				this.branches[x].branchLength = 0.01;
			}
			this.root.setTotalLength();
		}
	},
	saveNode : function(node)
	{
	  if(!node.id || node.id == "") node.id=node.tree.genId();
	  if(this.branches[node.id])
	  {
	   if(node != this.branches[node.id]) 
		{
			if(!this.leaf && node.id.match(/^[0-9]{1,3}(\.[0-9]+)?$/))
			{
				node.id = this.genId();
			}
			else
			{
				throw "Two nodes on this tree share the id " + node.id;
			}
		}
	  }else
	  {
		this.branches[node.id] = node;
	  }
	},
	setSize: function(width, height)
	{
		this.canvas.canvas.width = width;
		 this.canvas.canvas.height = height;
		 if(this.drawn){
			this.drawn = false;
			this.draw();
		 }
		  this.loader.resize();
	},
	setRoot : function(node)
	{
		node.canvas = this.canvas;
		node.tree = this;
		this.root =node;
	},
	setTreeType : function(type)
	{
		this.drawn = false;
		this.treeType = type;
		this.draw();
	},
	setNodeColourAndShape: function(nids, color, shape, size)
	{
		var arr = nids.split(",");
		if(nids != "")
		{
			for(var i = 0; i <  arr.length; i++)
			{
				if(this.branches[arr[i]])
				{
					if(color)this.branches[arr[i]].color = color;
					if(shape)this.branches[arr[i]].nodeShape = PhyloCanvas.Shapes[shape] ? PhyloCanvas.Shapes[shape] : shape;
					if(size) this.branches[arr[i]].radius = size;
				}
			}
			this.draw();
		}
	},
	hideLabels : function()
	{
	  this.showLabels = false;
	  this.draw();
	},
	displayLabels : function()
	{
	  this.showLabels = true;
	  this.draw();
	},
	toggleLabels : function()
	{
	  this.showLabels = !this.showLabels;
	  this.draw();
	},
	setFont : function(font)
	{
	  this.font = font;
	  this.draw();
	},
	setTextSize : function(size)
	{
	  this.textSize = Number(size);
	  this.draw();
	},
	setNodeSize : function(size)
	{
	  this.baseNodeSize = Number(size);
	  this.draw();
	},
	selectNodes : function(nIds)
	{
		this.root.setSelected(false, true);
			var ns = nIds.split(",");
			
			for(var i = 0; i < this.leaves.length; i++ )
			{
				for(var j = 0; j < ns.length; j++)
				{
					this.leaves[i].setSelected(ns[j] == this.leaves[i].id, false);
				}
			}
			this.draw();
			
			if(this.onselected) this.onselected(nIds);
		
	},
	translateClickX : function(x)
	{
	  x = (x - getX(this.canvas.canvas)  + window.pageXOffset);
	  x -= this.canvas.canvas.width/2;
	  x -= this.offsetx;
	  x = x / this.zoom;
	  return x;
	},
	translateClickY : function(y)
	{
	  y = (y - getY(this.canvas.canvas)  + window.pageYOffset) ;
	  y -= this.canvas.canvas.height/2;
	  y -= this.offsety;
	  y = y /this.zoom;
	  return y;
	},
	//internal 
	clicked : function(e)
	{
	  //this.canvas.fill();
	  if(e.button == 0)
	  {
		try{
			if(!this.root) return false;
			var nd = this.root.clicked(this.translateClickX(e.clientX * 1.0), this.translateClickY(e.clientY * 1.0));

			if(nd)
			{
			   this.root.setSelected(false, true);
			   if(this.internalNodesSelectable || nd.leaf)
			   {
				  nd.setSelected(true, true);
				  if(this.onselected) this.onselected(nd.getChildIds());
			   }
			}
			else if(this.unselectOnClickAway && !this.dragging)
			{
			   this.root.setSelected(false, true);
			   if(this.onselected) this.onselected("");
			}
			this.draw();
			if(!this.pickedup){
			   this.dragging = false;
			}
			return false;
		}catch(e){alert(e);}
	  }
	  else if(e.button == 2)
	  {
		  e.preventDefault();
	  }
	},	
	dblclicked : function(e)
	{
		if(!this.root) return false;
		var nd = this.root.clicked(this.translateClickX(e.clientX * 1.0), this.translateClickY(e.clientY * 1.0));
		if(nd) {
		   nd.setSelected(false, true);
		   nd.toggleCollapsed();
		}
		
		if(!this.pickedup){
			this.dragging = false;
		}
		this.draw();
	},
	pickup : function(event)
	{
	 if(!this.drawn) return false;
	 this.origx = this.offsetx;
	 this.origy = this.offsety;
	 
	 if(event.button == 0){
		this.pickedup = true;
	 }
	 if(event.button ==2 && this.rightClickZoom){
		this.zoomPickedUp = true;
		this.origZoom = Math.log(this.zoom)/Math.log(10);
		this.oz = this.zoom;
		// position in the diagram on which you clicked
		
		
	 }
	 this.startx = event.clientX ;
	 this.starty = event.clientY;
	
	},
	drop : function()
	{
	  if(!this.drawn) return false;
	  this.pickedup = false;
	  this.zoomPickedUp = false;
	},
	drag : function(event)
	{
		if(!this.drawn) return false;
		
		if(this.pickedup)
		{
			this.dragging = true;
			this.offsetx = this.origx + (event.clientX - this.startx);
			this.offsety = this.origy + (event.clientY - this.starty);
			this.draw();
		}
		else if(this.zoomPickedUp)
		{
		   this.d = ((this.starty - event.clientY) / 100);
		   x = this.translateClickX(this.startx);
		   this.setZoom(this.origZoom + this.d);
		   this.draw();
		}
		else
		{
		   e = event;
		 
		   var nd = this.root.clicked(this.translateClickX(e.clientX * 1.0), this.translateClickY(e.clientY * 1.0));
		   if(nd && (this.internalNodesSelectable || nd.leaf))
		   {
			  this.root.setHighlighted(false);
			  nd.setHighlighted(true);
		   }
		   else
		   {
			   this.root.setHighlighted(false);
		   }
		   this.draw();
		}
	},
	scroll : function(e)
   	{
	  try{
	
		 e.preventDefault();
		 var z = Math.log(this.zoom) /Math.log(10);
		 this.setZoom(z + (e.wheelDelta ? e.wheelDelta / 1000: e.detail / -100) );
	  }catch(e){alert(e);}
	}
};