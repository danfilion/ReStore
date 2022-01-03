using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
//using API.DTOs;
using API.Entities;
//using API.Extensions;
//using API.RequestHelpers;
//using API.Services;
//using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        //private readonly IMapper _mapper;
        //private readonly ImageService _imageService;

        public ProductsController(StoreContext context)//, IMapper mapper, ImageService imageService)
        {
            //_imageService = imageService;
            //_mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }

    }
}
