var estaciones_global =  [];


$(document).ready(function()
{
    var marker_mymap;
    var test
    var myFeatureGroup = L.featureGroup().addTo(mymap).on("click", groupClick);
    var greenIcon = L.icon({
        iconUrl: 'imagenes/punto.png',
        //shadowUrl: 'imagenes/leaf-shadow.png',

        // iconSize:     [20, 50], // size of the icon
        // shadowSize:   [30, 38], // size of the shadow
        iconAnchor:   [12, 24], // point of the icon which will correspond to marker's location
        // shadowAnchor: [4, 36],  // the same for the shadow
        // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    //recorremos las estaciones para pintarlas en el mapa
    for (var i = 0; i < estaciones_json.length; i++) 
    {
        //v 2.0 validacion de la actividad de la estación
        if(estaciones_json[i].activa)
        {
            marker_mymap  = L.marker([estaciones_json[i].lat, estaciones_json[i].long],{icon: greenIcon}).addTo(myFeatureGroup).bindPopup("Cargando...");;
            marker_mymap.idestacion = estaciones_json[i].id;
            marker_mymap.idarray = i;
        }
    }
    console.log(estaciones_json);
    
});

function groupClick(event) 
{
  var popup = event.layer._popup;
  var estacion  = event.layer.idestacion;
  var array  = event.layer.idarray;

  var info = '<b>Estación:</b> '+estaciones_json[array].id+'<br><b>Nombre: </b>'+ estaciones_json[array].nombre +'<br><b>Codigo: </b>'+estaciones_json[array].codigo+'<br><div style="margin-bottom: 25px; margin-top: 25px;" class="botonera"><a class="modal_mapa" data-id="'+ estaciones_json[array].id +'">Detalle Estación</a></div>';

  popup.setContent(info);
  popup.update();
}

function get_estaciones()
{
    var datedate = anio+"-"+mes+"-"+dia;

    $.ajax({
        type: 'GET',
        url: "https://api.datos.gob.mx/v1/sinaica?fecha="+datedate+"&pageSize=12000",
        data: {},
        success: function( data, textStatus, jqxhr ) 
        {
            var estations = [];
            
            for (var i = 0; i < data.results.length; i++) {
                estations.push(data.results[i]);
            }
            //estaciones.push(data.results.parametro);

            estaciones_global = estations;
        },
        xhrFields: 
        {
            withCredentials: false
        },
        crossDomain: true,
        async:false
    });
}



/*********************** codigo usado para crear el json de estaciones con estados y ciudades */


  // console.log(estaciones_json);    
    // for (let index = 0; index < estaciones_json.length; index++) {
    //     temporal(estaciones_json[index].id,index);
    // }
    // console.log(estaciones_json);

    // function temporal(id_estacion,index){

    //     var url =  'https://api.datos.gob.mx/v1/sinaica?estacionesid='+id_estacion+'&pageSize=1';
    
    //     $.ajax({
    //         type: 'GET',
    //         url: url,
    //         data: {},
    //         success: function( data, textStatus, jqxhr ) 
    //         {
    //             if (data.results.length > 0) 
    //             {
    //                 estaciones_json[index].state =  data.results[0].state;
    //                 estaciones_json[index].city =  data.results[0].city; estaciones_json[index].activa =  true; 
    //             }
    //             else
    //             {
    //                 estaciones_json[index].state =  '';
    //                 estaciones_json[index].city =  ''; 
    //                 estaciones_json[index].activa =  false; 
    //             }
              
    
    //           //  console.log(estaciones_json[index]);  
    //         },
    //         xhrFields: 
    //         {
    //             withCredentials: false
    //         },
    //         crossDomain: true,
    //         async:false
    //     });
    // }