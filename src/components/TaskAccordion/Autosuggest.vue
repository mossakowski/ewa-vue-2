<template>
	<div id="app">
		<div class="container">
      {{query}}
    <vue-autosuggest      
      ref="autocomplete"
      v-model="query"
      :suggestions="suggestions"
      :inputProps="inputProps"
      :sectionConfigs="sectionConfigs">
          <div slot-scope="{suggestion}" style="display: flex; align-items: center;">
            <div style="{ display: 'flex', color: 'navyblue'}">{{suggestion.item.name}}</div>
          </div>      
      </vue-autosuggest>
    <div v-if="selected" style="margin-top: 10px;">
    You have selected:
    <code><pre>{{JSON.stringify(selected, null, 4)}}</pre></code>
    </div>
	</div>	
	</div>
</template>

<script>
import { VueAutosuggest } from "vue-autosuggest";

export default {
  name: "app",
  components: {
    VueAutosuggest
  },
  data() {
    return {
      query: "Serwisss",
      selected: null,
      inputProps: {
        id: "autosuggest__input",
        placeholder: "Wybierz rodzaj pracy",
        class: "form-control",
        name: "hello",
        initialValue: "Serwis",
      },
      suggestions: [
          {
              data: [
                  { name: 'Serwis', type: 'serwis', paid: true, newClient: false },
                  { name: 'Awaria', type: 'serwis', paid: true, newClient: false }
              ],
              name: 'serwis'
          },
          {
              data : [
                  { name: 'Instalacja światłowodowa', type: 'installation', paid: true, newClient: true },
                  { name: 'instalacja radiowa', type: 'installation', paid: true, newClient: true }
              ],
              name: 'instalacje'
          }
      ],
      sectionConfigs: {
        instalacje: {
          limit: 6,
          label: "Instalacje",
          onSelected: selected => {
            this.selected = selected.item;
          }
        },
        serwis: {
          limit: 6,
          label: "Serwis",
          onSelected: selected => {
            this.selected = selected.item;
          }
        }
      }
    };
  },
  methods: {
    // getSuggestionValue(suggestion) {
    //   console.log('siemka');
    //   let { name, item } = suggestion;
    //   return name == "hotels" ? item.title : item.name;
    // }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.avatar {
  height: 25px;
  width: 25px;
  border-radius: 20px;
  margin-right: 10px;
}
#autosuggest__input {
  outline: none;
  position: relative;
  display: block;
  border: 1px solid #616161;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

#autosuggest__input.autosuggest__input-open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.autosuggest__results-container {
  position: relative;
  width: 100%;
}

.autosuggest__results {
  font-weight: 300;
  margin: 0;
  position: absolute;
  z-index: 10000001;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background: white;
  padding: 0px;
  max-height: 400px;
  overflow-y: scroll;
}

.autosuggest__results ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.autosuggest__results .autosuggest__results_item {
  cursor: pointer;
  padding: 15px;
}

#autosuggest ul:nth-child(1) > .autosuggest__results_title {
  border-top: none;
}

.autosuggest__results .autosuggest__results_title {
  color: gray;
  font-size: 11px;
  margin-left: 0;
  padding: 15px 13px 5px;
  border-top: 1px solid lightgray;
}

.autosuggest__results .autosuggest__results_item:active,
.autosuggest__results .autosuggest__results_item:hover,
.autosuggest__results .autosuggest__results_item:focus,
.autosuggest__results
  .autosuggest__results_item.autosuggest__results_item-highlighted {
  background-color: #f6f6f6;
}
</style>
