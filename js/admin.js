q = {}

var makeEditable = function () {
      $('.editable').editable(function (value, settings) {
             var id = $(this.parentElement.parentElement.parentElement)[0].id;
            return value;
      },
      {
            style   : 'display: inline;width:80%'
      });
}

var save = function (id) {
      SETTINGS['buffer'] = {};
      var url_get = SETTINGS['SERVER'] + SETTINGS['COLECOES'].join(',') + '/verbete/';
      $.getJSON(url_get+id, function (data) {
      var palavra = data['_source'];
      palavra['equivalencia'] = [];
      $("#orig-"+id +" .equivalencia").each(function (index, item) {
            if (item.textContent != 'Click to edit') {
                  palavra['equivalencia'].push(item.textContent);
            }
            else {
                  $(item).remove();
            }
      });

      SETTINGS['buffer'] = {
            'id' : id,
            'palavra' : palavra
      };
      alert('save function');
      console.log(SETTINGS['buffer']);
      });
}

var loadOriginal = function (id) {
      $.getJSON(SETTINGS['SERVER'] + SETTINGS['COLECOES'].join(',')+'/verbete/'+id+'/', function (data) {
            data['_source']['id'] = data['_id'];
            original.render(data['_source'])
            $("#orig-"+id+" ol").sortable();
            $("#orig-"+id+ " .save").show();
            $("#orig-"+id+ " .save").click(function (e) {
                  save(id);
            });
            $("#orig-"+id+" li").append("<span class='remove'>X</span>");
            $("#orig-"+id+" li .remove").each(function (index, item) {
                  $(item).click(function (e) {
                        $(e.currentTarget.parentNode).remove();
                  });
            });
            makeEditable();
      });
}

var remove = function (id) {
      $("#"+id).remove();
      //funcao p/ remover do server
}

var move = function(id, equiv) {
      if ($("#orig-"+id + " ol").length != 0) {
            $(equiv).appendTo("#orig-"+id + " ol");
            $("#orig-"+id+" ol").sortable();
            $(equiv).append("<span class='remove'>X</span>");
            $("#orig-"+id+" li .remove").each(function (index, item) {
                  $(item).click(function (e) {
                        $(e.currentTarget.parentNode).remove();
                  });
            });
            makeEditable();
      }
}

$(document).ready(function () {
      sugestoes = Tempo.prepare("sugestoes");
      original = Tempo.prepare("original");

      console.log('Cowabanga!');
      $.getJSON(SETTINGS['SERVER'] + SETTINGS['COLECOES'].join(',')+'-suggest' + '/_search?source=' + JSON.stringify(q), function (data){
                  $.each(data.hits.hits, function (index, t) {
                        id = t['_id'];
                        t['_source']['id'] = t['_id'];
                        sugestoes.append(t['_source'])
                        $("#"+id + " h3").click(function (e) {
                              e.stopPropagation();
                              loadOriginal(e.currentTarget.parentNode.id);
                        });
                        $("#"+id+ " .remove").click(function (e) {
                              remove(e.currentTarget.parentNode.id);
                        });

                        $("#"+id+ " .equivalencia").click(function (e) {
                              move(e.currentTarget.parentNode.parentNode.id, e.currentTarget);
                        });
                  });
            });
});
