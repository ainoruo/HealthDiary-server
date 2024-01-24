// mock data for simple API
const items = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
    {id: 3, name: 'Item kolme'},
    {id: 4, name: 'Item neljä'},
];

const getItems = (req, res) => {
res.json(items);
};

const getItemById = (req, res) => {
// palauta vain se objekti, jonka id vastaa pyydettyä, muuten 404
//   console.log('requested item id', req.params.id);
  const itemFound = items.find(item => item.id == req.params.id);
//   console.log('found item', itemFound);
  if (itemFound) {
    res.json(itemFound);
  } else {
    res.status(404).json({error: 'not found'});
  }
  
};

const postItem = (req, res) => {
    // TODO (vapaaehtonen, jatketaan tästä ens kerralla): lisää postattu item items-taulukkoon
    res.json({message: 'item created'});
  };

const deleteItem = (req, res) => {
    res.json({message: 'delete placeholder'});
}

const putItems = (req, res) => {
    res.json({message: 'put placeholder'});
}

export {getItems, getItemById, postItem, deleteItem, putItems};
