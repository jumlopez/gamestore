const productos = [
  { id: 'P-1001', nombre: 'Elden Ring', plataforma: 'PC', precio: 39990, stock: 12, stockCritico: 3, imagen: '../img/elden-ring.jpg' },
  { id: 'P-1002', nombre: 'Hogwarts Legacy', plataforma: 'PS5', precio: 49990, stock: 6, stockCritico: 3, imagen: '../img/hogwarts.jpg' },
  { id: 'P-1003', nombre: 'FIFA 27', plataforma: 'PS5', precio: 69990, stock: 20, stockCritico: 5, imagen: '../img/fifa27.jpg' },
  { id: 'P-1004', nombre: 'GTA V', plataforma: 'PC', precio: 29990, stock: 2, stockCritico: 3, imagen: '../img/GTA-5.jpg' },
  { id: 'P-1005', nombre: 'Zelda', plataforma: 'Switch', precio: 69990, stock: 9, stockCritico: 4, imagen: '../img/zelda.jpg' },
  { id: 'P-1006', nombre: 'Cyberpunk 2077', plataforma: 'Xbox', precio: 49990, stock: 4, stockCritico: 3, imagen: '../img/cyberpunk2077.jpg' }
];

const blogs = [
  { id: 'B-01', titulo: 'Las mejores historias épicas de 2026', estado: 'Publicado', imagen: '../img/zelda.jpg' },
  { id: 'B-02', titulo: 'Guía de accesorios para la próxima generación', estado: 'Publicado', imagen: '../img/hogwarts.jpg' },
  { id: 'B-03', titulo: 'Trending: el retro gaming vuelve con fuerza', estado: 'Borrador', imagen: '../img/cyberpunk2077.jpg' },
  { id: 'B-04', titulo: 'Novedades: lanzamientos para PC y consola', estado: 'Publicado', imagen: '../img/GTA-5.jpg' }
];

const usuarios = [
  { id: 'U-101', nombre: 'María López', email: 'maria@email.com', rol: 'Cliente', estado: 'Activo' },
  { id: 'U-102', nombre: 'Juan Pérez', email: 'juan@email.com', rol: 'Administrador', estado: 'Activo' },
  { id: 'U-103', nombre: 'Ana Torres', email: 'ana@email.com', rol: 'Cliente', estado: 'Pendiente' }
];

const formatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
});

function formatearPrecio(valor) {
  return formatter.format(valor);
}

function getStockClass(stock, critico) {
  if (stock === 0) return 'critical';
  if (stock <= critico) return 'warning';
  return 'available';
}

function renderMetrics() {
  const totalVentas = productos.reduce((acc, p) => acc + p.precio * Math.max(4, Math.round(p.stock * 0.7)), 0);
  const totalStock = productos.reduce((acc, p) => acc + p.stock, 0);
  const stockCritico = productos.filter((p) => p.stock <= p.stockCritico).length;

  const metricas = [
    { label: 'Total de ventas', value: formatearPrecio(totalVentas), trend: '+18.4%', tone: 'positive' },
    { label: 'Productos en stock', value: totalStock, trend: '+12%', tone: 'positive' },
    { label: 'Stock crítico', value: stockCritico, trend: stockCritico > 0 ? 'Revisar' : 'Normal', tone: stockCritico > 0 ? 'critical' : 'positive' },
    { label: 'Publicaciones de blog', value: blogs.length, trend: '4 historias', tone: 'positive' }
  ];

  const contenedor = document.getElementById('metrics-grid');
  if (!contenedor) return;

  contenedor.innerHTML = metricas.map((m) => `
    <article class="metric-card">
      <span class="label">${m.label}</span>
      <div class="metric-value">
        <span>${m.value}</span>
        <span class="metric-trend ${m.tone}">${m.trend}</span>
      </div>
    </article>
  `).join('');
}

function showView(viewName) {
  document.querySelectorAll('.nav-item').forEach((btn) => {
    const active = btn.dataset.view === viewName;
    btn.classList.toggle('active', active);
  });

  document.querySelectorAll('.content-view').forEach((panel) => {
    panel.classList.toggle('active', panel.id === `view-${viewName}`);
  });
}

function openEditModal(type, item, mode = 'edit') {
  const modal = document.getElementById('edit-modal');
  const title = document.getElementById('modal-title');
  const fields = document.getElementById('modal-fields');
  const form = document.getElementById('edit-form');

  if (!modal || !title || !fields || !form) return;

  const label = type === 'producto' ? 'producto' : type === 'blog' ? 'blog' : 'usuario';
  title.textContent = mode === 'new' ? `Nuevo ${label}` : `Editar ${label}`;

  if (type === 'producto') {
    fields.innerHTML = `
      <div class="field-group">
        <label for="edit-id">ID</label>
        <input id="edit-id" name="id" value="${item.id}" />
      </div>
      <div class="field-group">
        <label for="edit-platform">Plataforma</label>
        <select id="edit-platform" name="plataforma">
          <option value="PC" ${item.plataforma === 'PC' ? 'selected' : ''}>PC</option>
          <option value="PS5" ${item.plataforma === 'PS5' ? 'selected' : ''}>PS5</option>
          <option value="Xbox" ${item.plataforma === 'Xbox' ? 'selected' : ''}>Xbox</option>
          <option value="Switch" ${item.plataforma === 'Switch' ? 'selected' : ''}>Switch</option>
        </select>
      </div>
      <div class="field-group full">
        <label for="edit-name">Nombre</label>
        <input id="edit-name" name="nombre" value="${item.nombre}" />
      </div>
      <div class="field-group">
        <label for="edit-price">Precio</label>
        <input id="edit-price" name="precio" type="number" value="${item.precio}" />
      </div>
      <div class="field-group">
        <label for="edit-stock">Stock</label>
        <input id="edit-stock" name="stock" type="number" value="${item.stock}" />
      </div>
      <div class="field-group full">
        <label for="edit-image">Imagen</label>
        <input id="edit-image" name="imagen" type="text" value="${item.imagen}" placeholder="../img/mi-juego.jpg" />
      </div>
    `;
  } else if (type === 'blog') {
    fields.innerHTML = `
      <div class="field-group full">
        <label for="edit-blog-id">ID</label>
        <input id="edit-blog-id" name="id" value="${item.id}" />
      </div>
      <div class="field-group full">
        <label for="edit-blog-title">Título</label>
        <input id="edit-blog-title" name="titulo" value="${item.titulo}" />
      </div>
      <div class="field-group full">
        <label for="edit-blog-state">Estado</label>
        <select id="edit-blog-state" name="estado">
          <option value="Publicado" ${item.estado === 'Publicado' ? 'selected' : ''}>Publicado</option>
          <option value="Borrador" ${item.estado === 'Borrador' ? 'selected' : ''}>Borrador</option>
        </select>
      </div>
      <div class="field-group full">
        <label for="edit-blog-image">Imagen</label>
        <input id="edit-blog-image" name="imagen" type="text" value="${item.imagen}" placeholder="../img/mi-blog.jpg" />
      </div>
    `;
  } else {
    fields.innerHTML = `
      <div class="field-group">
        <label for="edit-user-id">ID</label>
        <input id="edit-user-id" name="id" value="${item.id}" />
      </div>
      <div class="field-group">
        <label for="edit-user-role">Rol</label>
        <select id="edit-user-role" name="rol">
          <option value="Cliente" ${item.rol === 'Cliente' ? 'selected' : ''}>Cliente</option>
          <option value="Administrador" ${item.rol === 'Administrador' ? 'selected' : ''}>Administrador</option>
        </select>
      </div>
      <div class="field-group full">
        <label for="edit-user-name">Nombre</label>
        <input id="edit-user-name" name="nombre" value="${item.nombre}" />
      </div>
      <div class="field-group full">
        <label for="edit-user-email">Email</label>
        <input id="edit-user-email" name="email" type="email" value="${item.email}" />
      </div>
      <div class="field-group full">
        <label for="edit-user-state">Estado</label>
        <select id="edit-user-state" name="estado">
          <option value="Activo" ${item.estado === 'Activo' ? 'selected' : ''}>Activo</option>
          <option value="Pendiente" ${item.estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
        </select>
      </div>
    `;
  }

  form.dataset.type = type;
  form.dataset.id = item.id;
  form.dataset.mode = mode;
  modal.classList.remove('hidden');
}

function closeEditModal() {
  const modal = document.getElementById('edit-modal');
  if (modal) modal.classList.add('hidden');
}

function bindTableButtons() {
  document.querySelectorAll('.table-button').forEach((btn) => {
    btn.onclick = () => {
      const fila = btn.closest('tr');
      const type = btn.classList.contains('delete') ? 'delete' : 'edit';
      const nombre = fila ? fila.querySelector('td:nth-child(2)')?.textContent.trim() : 'elemento';
      const id = fila?.querySelector('td')?.textContent.trim();

      if (type === 'edit') {
        const producto = productos.find((item) => item.id === id);
        if (producto) {
          openEditModal('producto', producto);
          return;
        }

        const blog = blogs.find((item) => item.id === id);
        if (blog) {
          openEditModal('blog', blog);
          return;
        }
      }

      if (btn.textContent.trim() === 'Eliminar') {
        if (confirm(`¿Deseas eliminar ${nombre}?`)) {
          const productoIndex = productos.findIndex((item) => item.id === id);
          if (productoIndex >= 0) {
            productos.splice(productoIndex, 1);
            renderMetrics();
            renderProductos();
            renderBlogs();
            alert(`Se eliminó: ${nombre}`);
            return;
          }

          const blogIndex = blogs.findIndex((item) => item.id === id);
          if (blogIndex >= 0) {
            blogs.splice(blogIndex, 1);
            renderMetrics();
            renderProductos();
            renderBlogs();
            alert(`Se eliminó: ${nombre}`);
          }
        }
      }
    };
  });
}

function renderProductos(filtro = '') {
  const overviewTbody = document.getElementById('product-table-body');
  const productsViewTbody = document.getElementById('products-view-body');

  const query = filtro.toLowerCase();
  const lista = productos.filter((producto) => {
    if (!query) return true;
    return [producto.id, producto.nombre, producto.plataforma, producto.stock].some((valor) =>
      String(valor).toLowerCase().includes(query)
    );
  });

  const html = lista.map((producto) => {
    const estado = producto.stock === 0 ? 'Sin stock' : producto.stock <= producto.stockCritico ? 'Bajo stock' : 'Disponible';
    const stockClass = getStockClass(producto.stock, producto.stockCritico);

    return `
      <tr>
        <td>${producto.id}</td>
        <td>
          <div class="product-name">
            <img class="product-thumb" src="${producto.imagen}" alt="${producto.nombre}" />
            <span>${producto.nombre}</span>
          </div>
        </td>
        <td><span class="product-platform">${producto.plataforma}</span></td>
        <td>${formatearPrecio(producto.precio)}</td>
        <td><span class="stock-badge ${stockClass}">${producto.stock}</span></td>
        <td><span class="status-badge ${estado === 'Disponible' ? 'published' : 'draft'}">${estado}</span></td>
        <td>
          <div class="action-group">
            <button class="table-button edit" type="button">Editar</button>
            <button class="table-button delete" type="button">Eliminar</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  if (overviewTbody) overviewTbody.innerHTML = html;
  if (productsViewTbody) productsViewTbody.innerHTML = html;

  bindTableButtons();
}

function renderBlogs(filtro = '') {
  const overviewTbody = document.getElementById('blog-table-body');
  const blogsViewTbody = document.getElementById('blogs-view-body');

  const query = filtro.toLowerCase();
  const lista = blogs.filter((blog) => {
    if (!query) return true;
    return [blog.id, blog.titulo, blog.estado].some((valor) =>
      String(valor).toLowerCase().includes(query)
    );
  });

  const html = lista.map((blog) => `
    <tr>
      <td>${blog.id}</td>
      <td>
        <div class="blog-title-cell">
          <img class="blog-thumb" src="${blog.imagen}" alt="${blog.titulo}" />
          <strong>${blog.titulo}</strong>
        </div>
      </td>
      <td><span class="status-badge ${blog.estado === 'Publicado' ? 'published' : 'draft'}">${blog.estado}</span></td>
      <td>
        <div class="action-group">
          <button class="table-button edit" type="button">Editar</button>
          <button class="table-button delete" type="button">Eliminar</button>
        </div>
      </td>
    </tr>
  `).join('');

  if (overviewTbody) overviewTbody.innerHTML = html;
  if (blogsViewTbody) blogsViewTbody.innerHTML = html;

  bindTableButtons();
}

function renderUsuarios() {
  const tbody = document.getElementById('users-view-body');
  if (!tbody) return;

  tbody.innerHTML = usuarios.map((usuario) => `
    <tr>
      <td>${usuario.id}</td>
      <td>${usuario.nombre}</td>
      <td>${usuario.email}</td>
      <td>${usuario.rol}</td>
      <td><span class="status-badge ${usuario.estado === 'Activo' ? 'published' : 'draft'}">${usuario.estado}</span></td>
    </tr>
  `).join('');
}

function cerrarSesion() {
  window.location.href = '../login.html';
}

function initDashboard() {
  const searchInput = document.getElementById('dashboard-search');
  const modal = document.getElementById('edit-modal');
  const form = document.getElementById('edit-form');

  renderMetrics();
  renderProductos();
  renderBlogs();
  renderUsuarios();

  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      const valor = event.target.value.trim();
      renderProductos(valor);
      renderBlogs(valor);
    });
  }

  document.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', () => {
      const view = item.dataset.view;
      if (view === 'logout') {
        cerrarSesion();
        return;
      }
      showView(view);
    });
  });

  document.querySelector('.logout-btn')?.addEventListener('click', cerrarSesion);

  document.getElementById('new-product-btn')?.addEventListener('click', () => {
    showView('products');
    openEditModal('producto', {
      id: `P-${Date.now().toString().slice(-4)}`,
      nombre: '',
      plataforma: 'PC',
      precio: 0,
      stock: 0,
      stockCritico: 1,
      imagen: '../img/elden-ring.jpg'
    }, 'new');
  });

  document.getElementById('new-product-page-btn')?.addEventListener('click', () => {
    showView('products');
    openEditModal('producto', {
      id: `P-${Date.now().toString().slice(-4)}`,
      nombre: '',
      plataforma: 'PC',
      precio: 0,
      stock: 0,
      stockCritico: 1,
      imagen: '../img/elden-ring.jpg'
    }, 'new');
  });

  document.getElementById('view-products-btn')?.addEventListener('click', () => showView('products'));

  document.getElementById('new-blog-btn')?.addEventListener('click', () => {
    showView('blogs');
    openEditModal('blog', {
      id: `B-${Date.now().toString().slice(-3)}`,
      titulo: '',
      estado: 'Publicado',
      imagen: '../img/zelda.jpg'
    }, 'new');
  });

  document.getElementById('new-blog-page-btn')?.addEventListener('click', () => {
    showView('blogs');
    openEditModal('blog', {
      id: `B-${Date.now().toString().slice(-3)}`,
      titulo: '',
      estado: 'Publicado',
      imagen: '../img/zelda.jpg'
    }, 'new');
  });

  document.getElementById('new-user-btn')?.addEventListener('click', () => {
    showView('users');
    openEditModal('usuario', {
      id: `U-${Date.now().toString().slice(-3)}`,
      nombre: '',
      email: '',
      rol: 'Cliente',
      estado: 'Activo'
    }, 'new');
  });

  document.querySelectorAll('[data-close-modal="true"]').forEach((btn) => {
    btn.addEventListener('click', closeEditModal);
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const itemType = form.dataset.type;
    const itemId = form.dataset.id;
    const mode = form.dataset.mode || 'edit';

    const formData = Object.fromEntries(data.entries());

    if (itemType === 'producto') {
      const nuevoProducto = {
        id: formData.id,
        nombre: formData.nombre,
        plataforma: formData.plataforma,
        precio: Number(formData.precio),
        stock: Number(formData.stock),
        stockCritico: 2,
        imagen: formData.imagen || '../img/elden-ring.jpg'
      };

      if (mode === 'new') {
        productos.unshift(nuevoProducto);
      } else {
        const index = productos.findIndex((item) => item.id === itemId);
        if (index >= 0) {
          productos[index] = { ...productos[index], ...nuevoProducto };
        }
      }
    } else if (itemType === 'blog') {
      const nuevoBlog = {
        id: formData.id,
        titulo: formData.titulo,
        estado: formData.estado,
        imagen: formData.imagen || '../img/zelda.jpg'
      };

      if (mode === 'new') {
        blogs.unshift(nuevoBlog);
      } else {
        const index = blogs.findIndex((item) => item.id === itemId);
        if (index >= 0) {
          blogs[index] = { ...blogs[index], ...nuevoBlog };
        }
      }
    } else {
      const nuevoUsuario = {
        id: formData.id,
        nombre: formData.nombre,
        email: formData.email,
        rol: formData.rol,
        estado: formData.estado
      };

      if (mode === 'new') {
        usuarios.unshift(nuevoUsuario);
      } else {
        const index = usuarios.findIndex((item) => item.id === itemId);
        if (index >= 0) usuarios[index] = nuevoUsuario;
      }
    }

    renderMetrics();
    renderProductos();
    renderBlogs();
    renderUsuarios();
    closeEditModal();
  });
}

document.addEventListener('DOMContentLoaded', initDashboard);
