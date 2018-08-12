/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url defined and is not empty', function() {
            for(let feed of allFeeds) {
        //check whether or not feed.url is defined        
                expect(feed.url).toBeDefined();
        //Then check the length(like above example)
                expect(feed.url.length).not.toBe(0);
            }
         }); 
         

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined and not empty', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(null);
        }        
        });         
    });

    /* Test suite named "The menu" */
    describe('The menu', function() {
        /* Test that ensures the menu element is
         * hidden by default. 
         */
        it('menu hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
    /* Refered to:
     * https://stackoverflow.com/questions/11750876/separation-of-context-and-trigger-in-jasmine
     * https://www.htmlgoodies.com/beyond/javascript/js-ref/testing-dom-events-using-jquery-and-jasmine-2.0.html
     */         
        it('menu changes visibility when menu icon is clicked', function() {
        // show menu
        $('a.menu-icon-link').trigger('click'); 
            expect($('body').hasClass('menu-hidden')).toBe(false);
                // hide menu again
                $('a.menu-icon-link').trigger('click'); 
                expect($('body').hasClass('menu-hidden')).toBe(true);
        });


    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done)
        });
        it('to have a single .entry within the .feed after loadFeed called', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    

     /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() { 
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let feedOne;
        let feedTwo;

        beforeEach(function(done) { 
        //load 1st RSS feed
            loadFeed(1, function() {
            //once loaded store feeds data into a variable
                feedOne = $('.feed').html();
                //load 2nd RSS feed
                loadFeed(2, function() {
                    //2nd feed loaded, store feeds data into variable
                    feedTwo = $('.feed').html();
                    //both feeds are loaded and data stored in var, ready to test
                    done();
                });
            }); 
        });
        it('feed changes', function() {
            expect(feedOne).not.toBe(feedTwo);
        });
    });
    });    
}());
