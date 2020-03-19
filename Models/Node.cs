using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Tree.API.Models
{

    [JsonObject(Title = "root")]
    public class Node
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage ="Enter Node name")]
        [Display(Name="Node Name")]
        public String Name { get; set; }

        public ICollection<Node> Children { get; set; }
        [Display(Name="Parent")]
        public int? ParentId { get; set; }

        public Node Parent { get; set; }
    }
}
