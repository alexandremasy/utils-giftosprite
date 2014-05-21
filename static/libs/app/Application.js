(function(window) {
	'use strict';

	/**
	 *	Application controller
	 *	
	 *	@author Alexandre Masy
	 */
	app.Application = Class.extend({

		//===========/----------------------------------------------
		//  [_PRO]  /  Properties
		//=========/------------------------------------------------

		/**
		 *	Current default value
		 **/
		_currentRendering : null,

		/**	
		 *	Fullscreen display
		 **/
		_fullscreen: false,

		//===========/----------------------------------------------
		//  [_GET]  /  Getters Setters
		//=========/------------------------------------------------

		/**
		 *	Define the current rendering method
		 *
		 *	@param value String
		 **/
		setRendering: function( value )
		{
			if ( value == this._currentRendering )
				return; 

			this._currentRendering = value;
			this.update();
		},

		/**
		 *	Set the fullscreen mode
		 *
		 *	@param value Boolean
		 **/
		setFullscreen: function( value )
		{
			if ( value == this._fullscreen )
				return;

			this._fullscreen = value;
			this.update();
		},

		//===========/----------------------------------------------
		//  [_MTD]  /  Methods public
		//=========/------------------------------------------------

		/**
		 *	El constructor
		 **/
		construct: function() 
		{
			this.init();
		},

		/**
		 *	Init the class
		 **/
		init: function() 
		{
			// fps
			this.meter = new FPSMeter( document.getElementById('fps'), {
				theme: 'dark',
				graph: true,

				position: 'relative'
			});

			// forms
			this.fullscreen = jQuery('#fullscreen').on('change', onChangeHandler.bind(this) );
			this.rendering = jQuery('#rendering').on('change', onChangeHandler.bind(this) );

			// managers
			this.animated = new app.view.AnimatedGif( jQuery('#gif') );
			this.canvas = new app.view.CanvasGif( jQuery('#spritesheet') );
			this.dom = new app.view.DomGif( jQuery('#dom') );

			// start
			this.setRendering( app.Data.CANVAS )
			this.meter.tickStart();
			this.render();
		},

		/**
		 *	Update the application
		 **/
		update: function()
		{
			console.log('update', this._currentRendering);
			switch( this._currentRendering )
			{
				case app.Data.GIF:
				default:
					this.animated.show();
					this.canvas.hide();
					this.dom.hide();
					break;

				case app.Data.CANVAS:
					this.animated.hide();
					this.canvas.show();
					this.dom.hide();
					break;

				case app.Data.DOM:
					this.animated.hide();
					this.canvas.hide();
					this.dom.show();
					break;
			}
		},

		/**
		 *	Animation frame render
		 **/
		render: function()
		{
			requestAnimationFrame(this.render.bind(this));

			this.meter.tick();
		}
	});

	//===========/----------------------------------------------
	//  [_PRI]  /  Methods private
	//=========/------------------------------------------------

	/**
	 *	Change handler
	 *
	 *	@param event Event
	 **/
	function onChangeHandler( event )
	{
		this.setRendering( this.rendering.val() );
	}

})(window);