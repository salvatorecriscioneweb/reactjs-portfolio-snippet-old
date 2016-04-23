var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Portfolio = React.createClass({
  getInitialState: function() {
    return {
      posts: [],
      opentab: false,
      currenttab: -1
    };
  },

  postClicked: function(i) {
    //console.log('clicked', i);
    this.setState({
      opentab: true,
      currenttab: i
    });
    fixContactMenu();
    return 0;
  },

  backToAll: function() {
    //console.log('clicked back');
    this.setState({
      opentab: false,
      currenttab: -1
    });
    fixContactMenu();
    return 0;
  },

  componentWillMount: function() {
    var that = this;
    axios.get('/api/post/list')
      .then(function (response) {
        that.setState({posts: response.data.posts});
      })
      .catch(function (response) {
        console.log('error:', response);
      });
  },

  componentDidUpdate: function() {
    fixContactMenu();
    jQuery('#portfolionav').css('top', jQuery('#portfolio').offset().top + 'px');
    if ( this.state.opentab ) {
      if ( viewport_width > 991 && viewport_width !== 0 ) {
        jQuery('.gotopost').css('top', '0');
      }
    }
  },

  render: function() {
    //console.log(this.state);
    var that = this;
    var portfolio_list = null;

    //console.log('render:', this.state);

    if ( !this.state.opentab ) {
        portfolio_list = this.state.posts.map(function(post ,i) {
          var postConverted = JSON.stringify(post);
          return (
                <PortfolioItem post={postConverted} postClick={that.postClicked} back={that.backToAll} key={i} nindex={i} expanded={false}/>
          );
        });
    } else {
      portfolio_list = this.state.posts.map(function(post ,i) {
        if ( i == that.state.currenttab ) {
          var postConverted = JSON.stringify(post);
          return (
                <PortfolioItem post={postConverted} postClick={that.postClicked} back={that.backToAll} key={i} nindex={i} expanded={true} />
          );
        } else {
          return (null);
        }
      });
    }

    //console.log(this.state.posts);

    return (
      <div>
            { portfolio_list.length === 0 ? <LoadingPosts /> : portfolio_list }
      </div>
    );
  }
});
