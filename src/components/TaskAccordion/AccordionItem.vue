<template>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
          <!-- zmiana dynamiczna accordion-1 -->
        <b-button block v-b-toggle.accordion-1 variant="info">#{{id}} {{title}} <b-button class="bg-danger">Usuń</b-button></b-button> 
      </b-card-header>
      <!-- zmiana dynamiczna accordion-1 -->
      <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
            <b-form-group label="Rodzaj pracy:">
                <b-form-select v-model="selectedTypeWork" :options="optionsTypeWork"></b-form-select>
            </b-form-group>

          <b-form-group label="Imię i nazwisko klienta/ nazwa firmy/ miejsce:">
                <b-form-input
                type="email"
                placeholder="Wpisz dane">
                </b-form-input>
            </b-form-group>

            <b-form-group label="Opis zdarzenia">
                <b-form-textarea
                placeholder="Opisz zdarzenie"
                rows="3"
                max-rows="6"
                ></b-form-textarea>                
            </b-form-group>

        </b-card-body>
      </b-collapse>
    </b-card>  
</template>

<script>
export default {
    name : 'AccordionItem',
    props: {
        title: String,
        typeWork: String,
        description: String,
        paid: Boolean,
        id: Number
    },
    data() {
        return {
            selectedTypeWork : 'Serwis',
            optionsTypeWork : [
                {
                    label: 'Serwis',
                    options: [
                        { value: 'Serwis', text: 'Serwis' },
                        { value: 'Awaria', text: 'Awaria' }
                    ]
                },
                {
                    label: 'Instalacje',
                    options: [
                        { value: 'fiber', text: 'Światłowodowa' },
                        { value: 'radio', text: 'Radiowa' }
                    ]
                }                
            ]
        }
    }
}
</script>
