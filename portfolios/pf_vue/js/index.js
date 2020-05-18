//GNB
new Vue({
	el: '#header',
	data: {
		menus: [
		  { text: '패키지여행'},
		  { text: '자유여행'},
		  { text: '라르고' },
		  { text: '프리미엄' },
		  { text: '항공'},
		  { text: '호텔'},
		],
	}
});

new Vue({
  el: '.sel1',
  data: {
    selected: 'AAA',
    options: [
      { text: '1명', value: 'AAA' },
      { text: '2명', value: 'BBB' },
      { text: '3명 이상', value: 'CCC' }
    ]
  }
})

new Vue({
  el: '.sel2',
  data: {
    selected: 'AAA',
    options: [
      { text: '0명', value: 'AAA' },
      { text: '1명', value: 'BBB' },
      { text: '2명', value: 'CCC' },
      { text: '3명 이상', value: 'DDD' }
    ]
  }
})



// 로고 컴포넌트
Vue.component('cl', {
  template: '<a class="logo" href="#"><img src="http://www.verygoodtourcompany.com/images/n_logo.png" alt=""></a>'
})








// 루트 인스턴스 생성
new Vue({
  el: '#header'
})




//달력 컴포넌트
new Vue({
	el: '#calendar',
	data: {
	  mode: 'range',
	  selectedDate: null,
	  datePickerTintColor: "#66B3CC",
	  selectedDate: {
	    start: new Date(),
	    end: new Date()
	  }
	},
})





// 탭탭
Vue.component('tabs_wrap', {
    template: `
        <div>
            <div class="tabs_wrap">
              <ul>
                <li v-for="tab in tabs_wrap" :class="{ 'is-active': tab.isActive }">
                    <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
                </li>
              </ul>
            </div>

            <div class="tabs-wrap-details">
                <slot></slot>
            </div>
        </div>
    `,
    data() {
        return {tabs_wrap: [] };
    },
    created() {
        this.tabs_wrap = this.$children;
    },
    methods: {
        selectTab(selectedTab) {
            this.tabs_wrap.forEach(tab => {
                tab.isActive = (tab.name == selectedTab.name);
            });
        }
    }
});
Vue.component('tab', {
    template: `
        <div v-show="isActive">
        	<slot>등록된 상품이 없습니다.</slot>
        </div>
    `,
    props: {
        name: { required: true },
        selected: { default: false}
    },
    data() {
        return { isActive: false};
    },
    computed: {
        href() {
            return '#' + this.name.toLowerCase().replace(/ /g, '-');
        }
    },
    mounted() {
        this.isActive = this.selected;
    }
});

new Vue({
    el: '#tabs_wrap'
});








//악시오스 (JSON 같은애)

var start = 0;

new Vue({
      el: '#Prd_lists',
      data: function() {
          return {
              bottom: false,
              datas: []
          }
      },
     methods: {
          bottomVisible: function() {

              var scrollY = window.pageYOffset;
              var visible = document.documentElement.clientHeight;
              var pageHeight = document.documentElement.scrollHeight;
              var bottomOfPage = visible + scrollY >= pageHeight;
              return bottomOfPage || pageHeight < visible;


          },

          addBeer: function() {
              axios.get('http://182.162.173.108:8936/solr/vgt_core/select?q=DOC_TYPE%3APKG_MASTER&start='+ start)
              .then(response => {
                  start = start + 10;
                  var api = response.data.response.docs;
                  this.datas.push(api);
                  if(this.bottomVisible()) {
                      this.addBeer();
                  }
              })
          }
      },
      watch: {
          bottom: function(bottom) {
              if(bottom) {
                  this.addBeer();
              }
          }
      },
     created: function() {
          window.addEventListener('scroll', () => {
              this.bottom = this.bottomVisible();
          });
          this.addBeer();
      },
  })
