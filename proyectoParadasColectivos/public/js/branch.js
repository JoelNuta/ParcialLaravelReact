window.addEventListener('load', () => {

        const data = {
                branches : {},
                saveName : '',
                editName : ''
        }
        function updateTable() {
                console.log("updated")
                axios.get('/branch')
                        .then(resp => data.branches = resp.data)
                        .catch(error => console.error(error.response.data))
        }

        function deleteBranch(id) {
                console.log("del")
                axios.delete('/branch/' + id)
                        .then(resp => {
                                data.branches = resp.data
                                updateTable()})
                        .catch(error => console.error(error.response.data))
        }
        function createBranch(saveName) {
                console.log("crear")
                const branch = { name: saveName, }
                axios.post('/branch', { name: saveName })
                        .then(resp => {
                                data.saveName = ''
                                updateTable()})
                        .catch(error => console.error(error.response.data))
        }
        function editBranch(id, editName){
                console.log("editar")
                const branch = { name: editName, }
                axios.put('/branch/' + id, { name: editName })
                        .then(resp => {
                                data.branches = resp.data
                                data.editName = ''
                                updateTable()})
                        .catch(error => console.error(error.response.data))
        }

        const app = new Vue({
                data: data,
                el: '#appBranch',
                methods: { deleteBranch, createBranch, editBranch}
        })

        updateTable()
})