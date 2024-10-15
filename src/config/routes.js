const routes = {
    home: '/',
    feedback: '/feedback',
    profile: '/@:nickname',
    upload: '/upload',
    search: '/search',

    //auth
    login: '/login',
    register: '/register',
    forgotpassword: 'forgotpassword',

    // user
    list_user: '/list-user',
    user_detail: '/user-detail/:userId',
    update_user: '/update-user/:id',
    delete_user: '/delete-user/:id',
    create_user: '/create-user',

    // shop
    shop: '/shop',
    create_shop: '/create-shop',
    update_shop: '/update-shop',
    shop_detail: '/shop-detail',

    //areas
    areas: '/areas',
    area_detail: '/area-detail/:areaId',
    // update_area: '/update-area/:id',
    // delete_area: '/delete-area/:id',
    // create_area: '/create-area',

    //tables
    tables: '/tables',
    table_detail: '/table-detail/:tableId',
    update_table: '/update-table/:id',
    delete_table: '/delete-table/:id',
    create_table: '/create-table',


};

export default routes;
