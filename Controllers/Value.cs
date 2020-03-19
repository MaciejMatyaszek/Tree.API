using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Tree.API.Data;
using Tree.API.Dto;
using Tree.API.Models;
using Tree.Dto;

namespace Tree.API.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class ValueController : Controller
    {

        private readonly DataContext _context;

        public ValueController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var displaydata = _context.Node.ToList();
            return View(displaydata);
        }


        [HttpPut]
        public async Task<IActionResult> Edit([FromBody] UpdateNodeCommand node)
        {
            if (ModelState.IsValid)
            {
                var nodeToUpdate = await _context.Node.FindAsync(node.Id);
                if (nodeToUpdate != null)
                {
                    nodeToUpdate.Name = node.Name;
                    nodeToUpdate.ParentId = node.ParentId;
                    await _context.SaveChangesAsync();
                    return NoContent();
                }
            }

            return BadRequest();
        }


        [HttpGet("all")]
        public IActionResult GetAll()
        {
            List<Node> list = _context.Node.ToList();

            return Ok(list.ElementAt(0));
        }


        [HttpGet("allElemennts")]
        public IActionResult GetAllelements()
        {
            List<Node> list = _context.Node.ToList();

            return Ok(list);
        }
        [HttpGet("{id}")]
        public IActionResult GetElement(int id)
        {
            Node node = _context.Node.FirstOrDefault(x => x.Id == id);


            return Ok(node);
        }

        [HttpGet("full")]
        public IActionResult GetElements()
        {
            List<Node> node = _context.Node.ToList();


            return Ok(node);
        }



        [HttpDelete("{id}")]
        async public Task<IActionResult> Delete(int id)
        {
            if (id != null)
            {
                var getNode = _context.Node.Find(id);
                if (getNode != null)
                {
                    getNode.Parent = null;
                    if (getNode.Children != null)
                    {
                        await RemoveChildren(getNode);

                    }

                    _context.Node.Remove(getNode);
                    await _context.SaveChangesAsync();
                    return NoContent();
                }
            }

            return BadRequest();

        }
        async Task RemoveChildren(Node node)
        {
            node.Parent = null;
            foreach (var child in node.Children)
            {
                if (child.Children != null)
                {

                    await RemoveChildren(child);
                }
                _context.Remove(child);

            }
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateNodeCommand node)
        {
            if (ModelState.IsValid)
            {
                var nodeToCreate = new Node();
                nodeToCreate.Name = node.Name;
                nodeToCreate.ParentId = node.ParentId;
                _context.Add(nodeToCreate);
                await _context.SaveChangesAsync();
                return Ok(nodeToCreate);
            }

            return BadRequest();
        }


    }



}
