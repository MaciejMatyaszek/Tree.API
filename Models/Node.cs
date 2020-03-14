using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Tree.API.Models
{
    public class Node
    {
        public int Id { get; set; }
        public String Name { get; set; }

        public ICollection<Node> Children { get; set; }
        public int ParentId { get; set; }

        public Node Parent { get; set; }
    }
}
