using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Tree.Dto
{
    public class UpdateNodeCommand
    {
        [Required]
        public int Id { get; set; }
        [Required(ErrorMessage = "Enter Node name")]
        [Display(Name = "Node Name")]
        public string Name { get; set; }

        [Display(Name = "Parent")]
        [Required]
        public int ParentId { get; set; }


    }
}
