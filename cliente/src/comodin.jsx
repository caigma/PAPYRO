<div className="row">
  <div className="col-md-12">

    <div id="mdb-lightbox-ui"></div>

    <div className="mdb-lightbox no-margin">

      <figure className="col-md-4">
        <a href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(117).jpg" data-size="1600x1067">
          <img alt="picture" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(117).jpg"
            className="img-fluid">
        </a>
      </figure>

      <figure className="col-md-4">
        <a href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(98).jpg" data-size="1600x1067">
          <img alt="picture" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(98).jpg"
            className="img-fluid" />
        </a>
      </figure>

      <figure className="col-md-4">
        <a href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(131).jpg" data-size="1600x1067">
          <img alt="picture" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(131).jpg"
            className="img-fluid" />
        </a>
      </figure>

      <figure className="col-md-4">
        <a href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(123).jpg" data-size="1600x1067">
          <img alt="picture" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(123).jpg"
            className="img-fluid" />
        </a>
      </figure>

      <figure className="col-md-4">
        <a href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(118).jpg" data-size="1600x1067">
          <img alt="picture" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(118).jpg"
            className="img-fluid" />
        </a>
      </figure>

      <figure className="col-md-4">
        <a href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(128).jpg" data-size="1600x1067">
          <img alt="picture" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(128).jpg"
            className="img-fluid" />
        </a>
      </figure>

      <figure className="col-md-4">
        <a href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(132).jpg" data-size="1600x1067">
          <img alt="picture" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(132).jpg"
            className="img-fluid" />
        </a>
      </figure>

      <figure class="col-md-4">
        <a href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(115).jpg" data-size="1600x1067">
          <img alt="picture" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(115).jpg"
            class="img-fluid" />
        </a>
      </figure>

      <figure class="col-md-4">
        <a href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(133).jpg" data-size="1600x1067">
          <img alt="picture" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(133).jpg"
            class="img-fluid" />
        </a>
      </figure>

    </div>

  </div>
</div>




<div>
				<div className="container-album">
					{this.state.photos.map((photo, idx) => (
						<div className="container-image">
							<Link to={`/photoDetail/${photo._id}`} key={photo._id}>
								<img src={photo.imageUrl} alt="alt" className="image" />
							</Link>
						</div>
					))}
				</div>

				<div className="fixed-search">
					<div className="two-buttons">
						<Link className="pruebaLink" style={{ textDecoration: 'none' }} to="albums-list">
							My Albums
						</Link>
						{/* <Link className="pruebaLink" style={{ textDecoration: 'none' }} to="printers">
							Send to Print
						</Link> */}
						<button onClick={this.catchPhotosPrint}>Send to Print</button>
						{this.state.redirect ? <Redirect to="/printers" /> : ''}
					</div>

					<SearchBar filterAndCheck={this.filterPhoto} />
				</div>
			</div>