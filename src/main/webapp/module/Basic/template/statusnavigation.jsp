<style>
    .breadcrumbs {
        display: inline-block;
        /* padding-top: 11px; */
        /* box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.35); */
        overflow: hidden;
        border-radius: 5px;
        border: 1px solid rgb(36,83,127);
        /* padding-left: 23px; */
        /* counter-reset: flag;  */
    }

    .breadcrumbs a {
        text-align: center;
        text-decoration: none;
        outline: none;
        display: block;
        float: left;
        font-size: 12px;
        line-height: 36px;
        color: white;
        /*need more margin on the left of links to accomodate the numbers*/
        padding: 0 10px 0 35px;
        background: #666;
        background: linear-gradient(#666, #333);
        position: relative;
    }

    /*since the first link does not have a triangle before it we can reduce the left padding to make it look consistent with other links*/
    .breadcrumbs a:first-child {
        padding-left: 23px;
        border-radius: 5px 0 0 5px;
        /*to match with the parent's radius*/
    }

    .breadcrumbs a:first-child:before {
        left: 14px;
    }

    .breadcrumbs a:last-child {
        border-radius: 0 5px 5px 0;
        /*this was to prevent glitches on hover*/
        padding-right: 20px;
    }

    /*hover/active styles*/
    .breadcrumbs a.active,
    .breadcrumbs a:hover {
        background: #333;
        background: linear-gradient(#333, #000);
    }

    .breadcrumbs a.active:after,
    .breadcrumbs a:hover:after {
        background: #333;
        background: linear-gradient(135deg, #333, #000);
    }

    /*adding the arrows for the breadcrumbss using rotated pseudo elements*/
    .breadcrumbs a:after {
        content: '';
        position: absolute;
        top: 0;
        right: -18px;
        /*half of square's length*/
        /*same dimension as the line-height of .breadcrumbs a */
        width: 36px;
        height: 36px;
        /*as you see the rotated square takes a larger height. which makes it tough to position it properly. So we are going to scale it down so that the diagonals become equal to the line-height of the link. We scale it to 70.7% because if square's: 
    */
        transform: scale(0.707) rotate(45deg);
        /*we need to prevent the arrows from getting buried under the next link*/
        z-index: 1;
        /*background same as links but the gradient will be rotated to compensate with the transform applied*/
        background: #666;
        background: linear-gradient(135deg, #666, #333);
        /*stylish arrow design using box shadow*/
        box-shadow:
            2px -2px 0 2px rgb(250, 249, 249),
            3px -3px 0 2px rgba(255, 255, 255, 0.1);
        border-radius: 0 5px 0 50px;
    }

    /*we dont need an arrow after the last link*/
    .breadcrumbs a:last-child:after {
        content: none;
    }


    .flat a,
    .flat a:after {
        background: white;
        color: white;
        transition: all 0.5s;
    }
    

    .flat a:before {
        background: white;
        box-shadow: 0 0 0 1px #ccc;
    }

    .flat a:hover,
    .flat a.active,
    .flat a:hover:after,
    .flat a.active:after {
        background: rgb(36,83,127);
        color: white !important;
    }
</style>



<div class="d-flex justify-content-end">
    <div class="breadcrumbs flat mt-2" id="bread">

    </div>
</div>
