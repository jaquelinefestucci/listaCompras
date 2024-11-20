const todosApp = {
        data () {
            return{
                todos: [],
                todosVisiveis: [],
                novoItem: {
                    text: '',
                    done: false
                },
                dividirQuantidade: 1 
         }
    },
    methods: {
        addItem: function(){
            if (this.novoItem.text) {
                this.todos.push({ 
                    text: this.novoItem.text.toUpperCase(), 
                    quantidade: 1,
                    done: false });
                this.novoItem.text="";
                this.$refs.inputField.focus();
                this.todos.sort((a,b) => a.text.localeCompare(b.text));
                this.todosVisiveis = this.todos.filter(item => !item.done);
                localStorage.setItem("item", JSON.stringify(this.todos));
            }else {
                alert("Obrigatório o preenchimento do item");
            }
        },tirarCaptura: function() {
            const areaDeCaptura = document.querySelector('.todo-list');  
            html2canvas(areaDeCaptura).then(canvas => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'lista_de_compras.png';  
                link.click();  // Simula o clique para download
            })
        },
            convertToUpperCase() {
                this.novoItem.text = this.novoItem.text.toUpperCase();
        }, atualizar: function(){
            this.todosVisiveis = this.todos.filter (item => !item.done)
        }, 
        novaLista: function(){
            this.todos= [];
            this.todosVisiveis = [];
            localStorage.removeItem("item");
          }
    },
    computed: {
        totalSum() {
            return this.todosVisiveis.reduce((acc, item) => {
                return acc + (item.quantidade * item.unitario || 0);
            }, 0).toFixed(2);  
        }
    },
             created() {
             this.todos = localStorage.getItem("item") ? JSON.parse(localStorage.getItem("item") ) : []; 
             this.todosVisiveis = [...this.todos];
 },
    updated() {
        localStorage.setItem("item", JSON.stringify(this.todos));
 }
};

Vue.createApp (todosApp).mount('#app');
