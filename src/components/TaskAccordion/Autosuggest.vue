<template>
      <vue-autosuggest
        v-model="searchText"
        componentAttrIdAutosuggest="demo-autosuggest"
        @input="(...args) => logEvent('input', args)"
        @highlighted="(...args) => logEvent('highlighted', args)"
        @selected="onSelected"
        :suggestions="filteredOptions"
        :input-props="inputProps"
        :section-configs="sectionConfigs"
        :getSuggestionValue="getSuggestionValue"
        :should-render-suggestions="(size, loading) => size >= 0 && !loading && searchText !== ''"
        ref="autocomplete"
      >
        <template slot="before-input">
          <label :for="inputProps.id">Select a LOTR Character</label>
        </template>
        <template slot-scope="{suggestion, index, cs}">
          <div>{{ suggestion && suggestion.item.Name }}</div>
        </template>
        <template slot="after-suggestions">
          <p v-if="filteredOptions == 0" style="text-align: center;">No Results... Try <a style="color: peachpuff;" :href="`https://www.google.com/search?safe=active&source=hp&ei=t_M-Xci6EYq6tgXrzbLoCw&q=${searchText}`" @mouseup.stop target="_blank">googling</a></p>
        </template>
      </vue-autosuggest>  

                    <!-- <b-form-group label="Rodzaj pracy:">
                         <select @change="updateSelectedTypeWork($event, indexAccordion, statusTask), displayToggleNewClient($event)" v-model="selectedTypeWork" class="custom-select">
                            <optgroup label="Serwis">
                                <option value="Serwis">Serwis</option>
                                <option value="Awaria">Awaria</option>
                                <option value="Przedłużenie umowy">Przedłużenie umowy</option>
                            </optgroup>
                            <optgroup label="Instalacje">
                                <option value="Instalacja światłowodowa" data-type="installation" data-method='fiber'>Instalacja światłowodowa</option>
                                <option value="Instalacja Radiowa" data-type="installation" data-method='radio'>Instalacja Radiowa</option>
                                <option value="Instalacja Blok" data-type="installation" data-method='fiber'>Instalacja Blok</option>
                                <option value="Instalacja Zbiorcza" data-type="installation" data-method='fiber'>Instalacja Zbiorcza</option>
                                <option value="Instalacja TV">Instalacja TV</option>
                            </optgroup>
                            <optgroup label="Budowa sieci">
                                <option value="Budowa sieci">Budowa</option>
                                <option value="Budowa sieci">Przebudowa</option>
                                <option value="Budowa sieci">Wywiad techniczny (napisz czy są możliwości)</option>
                            </optgroup>
                            <optgroup label="Biuro">
                                <option value="Prace biurowe">Prace biurowe</option>                                
                                <option value="Sprzątanie">Sprzątanie</option>                                
                                <option value="Inne">Inne</option>                                
                            </optgroup>
                        </select>                                         
                    </b-form-group> -->



</template>

<script>
import typeWork from './typeWork.js'
export default {
    name: "Autosuggest",
    data() {
        return {
            query: ''
        }
    }
}
</script>

<style>

</style>