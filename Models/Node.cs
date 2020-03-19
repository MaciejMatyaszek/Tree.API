using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Tree.API.Models
{
    public class Node
    {
        public int Id { get; set; }
        public String Name { get; set; }
        public ICollection<Node> Children { get; set; }
        public int? ParentId { get; set; }
        public Node Parent { get; set; }
    }
}
